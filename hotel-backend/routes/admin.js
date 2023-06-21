const express = require('express');
const Admin = require('../models/Admin');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const adminmiddle = require('../middleware/adminmiddle');
const Booking = require('../models/Booking');


//Route 1:create a admin using:POST "/api/admin" .no login reqired
router.post('/createadmin',
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('password', "Enter atlease 5 charactors").isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }

            //check whether the admin with this email alrady exists.
            let admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                return res.status(400).json({ success, error: 'Sorry an admin with this email already exists ' });
            }

            //adding security in password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            // create a admin account
            admin = await Admin.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            // add jwt token
            const data = {
                admin: {
                    id: admin.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({ success, authToken })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

//Route 2: login admin  with password

router.post('/login',
    [
        body('email', "Enter a valid email").isEmail(),
        body('password', "Password cannot be blank").exists()
    ],
    async (req, res) => {
        let success = false;

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }

            const { email, password } = req.body;
            //check whether the email and password is correct or not.
            let admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }

            const passwordCompare = await bcrypt.compare(password, admin.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }

            const data = {
                admin: {
                    id: admin.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({ success, authToken })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }
    })

//Route 3: get all user details.

router.get('/getallusers', adminmiddle,
async (req, res) => {
    let success = false;
    try {
        const adminId = req.admin.id;
        let users;
        if (adminId) {
            users = await User.find({}).select("-password");
            success = true;
            res.send({ success, users })
        }
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }

})

//Route 4: get all bookings using GET '/admin/getallbooking'

router.get('/getallbookings', adminmiddle,
    async (req, res) => {
        try {
            const adminId = req.admin.id;
            let bookings;
            if (adminId) {
                bookings = await Booking.find({});
                success = true;
                res.send({ success, bookings })
            }
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })


module.exports = router