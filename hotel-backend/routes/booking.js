const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bookingVerify = require("../middleware/bookingVerify");
const adminVerify = require("../middleware/adminVerify");

//Route 1:create a booking using:POST "/api/booking/createbooking" .no login reqired
router.post(
  "/createbooking",
  bookingVerify,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter vaild phone number").isInt(),
    body("specialRequest"),
    body("roomDetails").not().isEmpty(),
    body("startDate").not().isEmpty(),
    body("endDate").not().isEmpty(),
    body("totalPrice").not().isEmpty(),
    body("totalRooms").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        specialRequest,
        roomDetails,
        startDate,
        endDate,
        totalPrice,
        totalRooms,
      } = req.body;
      //validation result
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation Error", error: errors.array() });
      }
      // Create the Booking object
      const bookingData = {
        name,
        email,
        phone,
        specialRequest,
        roomDetails,
        startDate,
        endDate,
        totalPrice,
        totalRooms,
      };

      // Add user property if the user is logged in
      const userId = req.header("userId");
      if (userId !== "undefined") {
        bookingData.userId = userId;
      }

      // Save the booking
      const saveBooking = await Booking.create(bookingData);
      res.json({ success: true, message: "Booking successful", saveBooking });
    } catch (error) {
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

//Route 2: get user booking history if he have account using GET '/api/booking/getuserbooking'

router.get("/getuserbooking", bookingVerify, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

//Route 3: get all bookings using GET '/booking/getallbookings'

router.get("/getallbookings", adminVerify, async (req, res) => {
  try {
    const adminId = req.admin.id;
    if (adminId) {
      const bookings = await Booking.find({});
      res.send({ success: true, bookings });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

//Route 4: get all bookings using GET '/booking/getbookingsbydate'

router.post("/getbookingsbydate", adminVerify, async (req, res) => {
  try {
    const adminId = req.admin.id;
    if (adminId) {
      const { from, to } = req.body;
      //find booked rooms by date
      if (!from || !to) {
        return res.status(400).json({
          message: "Bad Request: 'from' and 'to' dates are required.",
        });
      }
      const bookingsByDate = await Booking.find({
        $or: [
          { startDate: { $gte: from, $lte: to } },
          { endDate: { $gte: from, $lte: to } },
        ],
      }).sort({ startDate: 1 });
      if (bookingsByDate.length === 0) {
        return res.json({
          message: "No bookings found for the specified date range.",
          bookingsByDate,
        });
      }
      res.send({ success: true, bookingsByDate });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

//Route 5: delete bookings using DELETE '/api/booking/deletebooking' Login required

router.delete("/deletebooking/:id", adminVerify, async (req, res) => {
  try {
    //find the booking and delete
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .send({ success: false, message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking succesfully deleted",
      booking,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});
module.exports = router;
