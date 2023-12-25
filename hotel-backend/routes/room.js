const express = require("express");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const RoomDetail = require("../models/RoomDetail");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const adminVerify = require("../middleware/adminVerify");

//Route 1:add a room using:POST "/api/rooms" .admin login reqired
router.post(
  "/addroom",
  adminVerify,
  [
    body("roomType", "Enter a valid room type").isLength({ min: 3 }),
    body("price", "Enter a valid price").isInt(),
    body("name", "Enter a name").isLength({ min: 3 }),
    body("capacity", "Enter a valid capacity").isInt(),
    body("description"),
  ],
  async (req, res) => {
    try {
      const { roomType, price, name, capacity, description } = req.body;
      //validation result
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation Error", error: errors.array() });
      }
      //add room
      const rooms = new Room({ roomType, price, name, capacity, description });
      const saveRoom = await rooms.save();
      res.json({ message: "Room succesfully added", success: true, saveRoom });
    } catch (error) {
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

//Route 2: get all rooms using GET '/room/getallrooms' .no login required

router.get("/getallrooms", async (req, res) => {
  try {
    let success = false;
    /* const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      throw new Error("Invalid page or limit parameters.");
    } */
    //  const skip = (page - 1) * limit;
    // let search = req.query.search
    // const rooms = await Room.find({ roomType: { $regex: search } }).skip(skip).limit(limit);
    const [rooms, count] = await Promise.all([
      // Room.find({}).skip(skip).limit(limit),
      Room.find({}),
      ,
      Room.countDocuments({}),
    ]);
    success = true;
    res.json({ success, rooms, count });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

//Route 3: get available room using POST '/api/room/getavailableroom/' No Login required

router.post("/getavailableroom", async (req, res) => {
  try {
    let success = false;
    const { from, to } = req.body;
    //find all booked rooms
    let bookedRooms = await Booking.find({
      $or: [
        { startDate: { $gte: from, $lte: to } },
        { endDate: { $gte: from, $lte: to } },
      ],
    });

    const rooms = await Room.find();
    // Create an empty object to store the totalrooms of each roomtype
    const quantity = {};
    const roomdetails = await RoomDetail.find();
    for (const roomDetail of roomdetails) {
      quantity[roomDetail.roomType] = roomDetail.totalRooms;
    }
    //if no rooms booked then we send all rooms details
    if (bookedRooms.length === 0) {
      success = true;
      res.json({ success, quantity, rooms });
    } else {
      // Iterate through each booking and update the roomTypeTotals object
      bookedRooms.forEach((booking) => {
        booking.roomDetails.forEach((roomDetail) => {
          const { roomType } = roomDetail;
          if (quantity[roomType]) {
            quantity[roomType] -= roomDetail.count;
          }
        });
      });
      success = true;
      res.json({ success, quantity, rooms });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});

//Route 4: update room using PUT '/api/room/updateroom' Admin Login required

router.put(
  "/updateroom/:id",
  adminVerify,
  [
    body("roomType", "Enter a valid room type").isLength({ min: 3 }),
    body("price", "Enter a valid price").isInt(),
    body("name", "Enter a name").isLength({ min: 3 }),
    body("capacity", "Enter a valid capacity").isInt(),
    body("description"),
  ],
  async (req, res) => {
    try {
      const { roomType, price, name, capacity, description } = req.body;
      //validation result
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      //create newRoom object
      const newRoom = {};
      if (roomType) {
        newRoom.roomType = roomType;
      }
      if (description) {
        newRoom.description = description;
      }
      if (price) {
        newRoom.price = price;
      }
      if (name) {
        newRoom.name = name;
      }
      if (capacity) {
        newRoom.capacity = capacity;
      }

      //find the room and update
      let room = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: newRoom },
        { new: true }
      );
      if (!room) {
        return res.status(404).send({
          success: false,
          message: "Room not found",
        });
      }

      res.json({ message: "Room succesfully updated", success: true, room });
    } catch (error) {
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  }
);

//Route 5: delete notes using DELETE '/api/notes/deletenote' Login required

router.delete("/deleteroom/:id", adminVerify, async (req, res) => {
  try {
    //find the room and delete
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res
        .status(404)
        .send({ success: false, message: "Room not found" });
    }

    res.json({ success: true, message: "Room succesfully deleted", room });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
});
module.exports = router;
