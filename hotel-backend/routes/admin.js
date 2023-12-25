const express = require("express");
const Admin = require("../models/Admin");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminVerify = require("../middleware/adminVerify");

//Route 1:create a admin using:POST "/api/admin/createadmin" .login reqired
router.post(
  "/createadmin",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter atlease 5 charactors").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors from the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation Error", error: errors.array() });
      }
      //check whether the admin with this email alrady exists.
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(400)
          .json({ error: "Sorry an admin with this email already exists " });
      }

      // Hash the password for security
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a admin account
      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generate a JWT token containing the admin ID for authentication
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      // Return success response along with the generated token
      res.json({
        success: true,
        message: "Admin succesfully created",
        authToken,
      });
    } catch (error) {
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

//Route 2: login admin  with password /api/admin/login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation Error", error: errors.array() });
      }

      const { email, password } = req.body;
      //check whether the email and password is correct or not.
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({
            success,
            message: "Please try to login with correct credentials",
          });
      }
      // Compare the provided password with the hashed password in the database
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            message: "Please try to login with correct credentials",
          });
      }
      // If the login credentials are valid, generate a JWT token containing the admin ID for authentication
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      // Return success response along with the generated token
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

//Route 3: get all user details. login admin required /api/admin/getallusers

router.get("/getallusers", adminVerify, async (req, res) => {
  try {
    // Get the admin ID from the request object
    const adminId = req.admin.id;
    // Extract the page and limit parameters from the query string
    /*  let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            let skip = (page - 1) * limit; */
    //id admin id found then fetch all user without password
    if (adminId) {
      // Fetch total count and users, skip and limit the results, and exclude the 'password' field
      const [users, count] = await Promise.all([
        // User.find({}).skip(skip).limit(limit).select("-password"),
        User.find({}).select("-password"),
        User.countDocuments({}),
      ]);
      res.send({ success: true, users, count });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

//Route 4: get loggedin admin details. Admin Login required /api/admin/getadmin
router.get("/getadmin", adminVerify, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res
        .status(404)
        .send({ success: false, message: "Admin not found" });
    }
    res.send({ success: true, admin });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
