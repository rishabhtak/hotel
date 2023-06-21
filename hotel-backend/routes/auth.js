const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getuser = require('../middleware/getuser');
require('dotenv').config()



//const JWT_SECRET = "Rishabh";


//Route 1:create a user using:POST "/api/auth/createuser" .no login reqired
router.post('/createuser',
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('password', "Enter atlease 5 charactors").isLength({ min: 5 }),
        body('phone', "Enter vaild phone number").isInt(),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation Error", error: errors.array() })
        }

        try {
            //check whether the user with this email alrady exists.
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: 'Sorry a user with this email already exists ' });
            }

            //adding security in password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            // create a user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                phone: req.body.phone
            });

            // add jwt token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            // res.json(user);
            res.json({ success, authToken })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

//Route 2: authenticate user. No login reqired

router.post('/login',
    [
        body('email', "Enter a valid email").isEmail(),
        body('password', "Password cannot be blank").exists()
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation Error", error: errors.array() })
        }

        const { email, password } = req.body;

        try {
            //check whether the email and password is correct or not.
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            // res.json(user);
            success = true;
            res.json({ success, authToken })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }
    })

//Route 3: get loggedin user details. Login required

router.post('/getuser', getuser,
    async (req, res) => {
        let success = false;
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            success = true;
            res.send({ success, user })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })



module.exports = router