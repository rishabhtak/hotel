const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bookingmiddle = require('../middleware/bookingmiddle');


//Route 1:create a booking using:POST "/api/booking" .no login reqired
router.post('/booking', bookingmiddle,
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('phone', "Enter vaild phone number").isInt(),
        body('specialrequest')
    ],
    async (req, res) => {
        let success = false;
        try {

            const { name, email, phone, specialrequest } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }
            let saveBooking;
            if (!req.user) {
                const booking = new Booking({ name, email, phone, specialrequest })
                saveBooking = await booking.save();
            }
            else {
                const booking = new Booking({ name, email, phone, specialrequest, user: req.user.id })
                saveBooking = await booking.save();
            }

            success = true;
            res.json({ success, saveBooking })
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error");
        }

    })

//Route 2: get user booking using GET '/admin/getallbooking'

router.get('/booking', bookingmiddle,
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