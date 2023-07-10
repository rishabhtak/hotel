const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bookingVerify = require('../middleware/bookingVerify');


//Route 1:create a booking using:POST "/api/booking" .no login reqired
router.post('/createbooking', bookingVerify,
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('phone', "Enter vaild phone number").isInt(),
        body('specialrequest'),
        body('roomsid').not().isEmpty(),
        body('startdate').not().isEmpty(),
        body('enddate').not().isEmpty(),
        body('totalperson').not().isEmpty(),
        body('roomtype').not().isEmpty(),
        body('totalroom').not().isEmpty(),
        body('totalprice').not().isEmpty(),
    ],
    async (req, res) => {
        try {

            const { name, email, phone, specialrequest, roomsid, startdate, enddate, totalperson, roomtype, totalroom, totalprice } = req.body;
            //validation result
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }
            let saveBooking;
            //if user is not logged in or not have account
            if (!req.user) {
                const booking = new Booking({ name, email, phone, specialrequest, roomsid, startdate, enddate, totalperson, roomtype, totalroom, totalprice })
                saveBooking = await booking.save();
            }
            else {
                // if user already has account
                const booking = new Booking({ name, email, phone, specialrequest, roomsid, startdate, enddate, totalperson, roomtype, totalroom, totalprice, user: req.user.id })
                saveBooking = await booking.save();
            }
            res.json({ message: "Booking succesfully", saveBooking })
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error");
        }

    })

//Route 2: get user room booking history if he have account using GET '/api/booking/getuserbooking'

router.get('/getuserbooking', bookingVerify,
    async (req, res) => {
        try {
            let success = false;
            const bookings = await Booking.find({ user: req.user.id })
            success = true;
            res.json({ success, bookings })
        }

        catch (error) {
            res.status(500).send("Internal server error");
        }

    })






module.exports = router;