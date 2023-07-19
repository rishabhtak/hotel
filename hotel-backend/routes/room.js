const express = require('express');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const RoomDetail = require('../models/RoomDetail');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const adminVerify = require('../middleware/adminVerify');

//Route 1:add a room using:POST "/api/rooms" .admin login reqired
router.post('/addroom', adminVerify,
    [
        body('roomType', "Enter a valid room type").isLength({ min: 3 }),
        body('price', "Enter a valid price").isInt(),
        body('name', "Enter a name").isLength({ min: 3 }),
        body('capacity', "Enter a valid capacity").isInt(),
        body('description')
    ],
    async (req, res) => {
        try {
            const { roomType, price, name, capacity, description } = req.body;
            //validation result
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }
            //add room
            const rooms = new Room({ roomType, price, name, capacity, description })
            const saveRoom = await rooms.save();
            res.json({ message: "Room succesfully added", saveRoom })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

//Route 2: get all rooms using GET '/room/getallrooms' .no login required

router.get('/getallrooms', async (req, res) => {
    try {
        let success = false;
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        let skip = (page - 1) * limit;
        // let search = req.query.search
        const count = await Room.find({}).count()
        // const rooms = await Room.find({ roomType: { $regex: search } }).skip(skip).limit(limit);
        const rooms = await Room.find({}).skip(skip).limit(limit);
        success = true;
        res.json({ success, rooms, count })
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})

//Route 3: get available room using POST '/api/room/getavailableroom/' No Login required

router.post('/getavailableroom', async (req, res) => {
    try {
        let success = false;
        const { from, to } = req.body;
        //find all booked rooms
        let bookedRooms = await Booking.find({
            $or: [
                { startDate: { $gte: from, $lte: to } },
                { endDate: { $gte: from, $lte: to } }
            ],
        })
        const rooms = await Room.find();
        // Create an empty object to store the totalrooms of each roomtype
        const quantity = {};
        const roomdetails = await RoomDetail.find();
        for (const roomDetail of roomdetails) {
            quantity[roomDetail.roomType] = roomDetail.totalRooms
        }
        //if no rooms booked then we send all rooms details
        if (bookedRooms.length === 0) {
            success = true;
            res.json({ success, quantity, rooms })
        }
        else {
            // Iterate through each booking and update the roomTypeTotals object
            bookedRooms.forEach((booking) => {
                booking.roomDetails.forEach((roomDetail) => {
                    const { roomtype } = roomDetail;
                    if (quantity[roomtype]) {
                        quantity[roomtype] -= 1;
                    }
                });
            });
            success = true;
            res.json({ success, quantity, rooms });
        }

    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})

//Route 4: update room details using PUT '/api/room/updateroom' Admin Login required

router.put('/updateroom/:id', adminVerify, [
    body('roomType', "Enter a valid room type").isLength({ min: 3 }),
    body('price', "Enter a valid price").isInt(),
    body('name', "Enter a name").isLength({ min: 3 }),
    body('capacity', "Enter a valid capacity").isInt(),
    body('description')
],
    async (req, res) => {
        try {
            const { roomType, price, name, capacity, description } = req.body;
            //validation result
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            //create newRoom object
            const newRoom = {};
            if (roomType) { newRoom.roomType = roomType }
            if (description) { newRoom.description = description }
            if (price) { newRoom.price = price }
            if (name) { newRoom.name = name }
            if (capacity) { newRoom.capacity = capacity }



            //find the room
            let room = await Room.findById(req.params.id);
            if (!room) { return res.status(404).send("Not Found") }

            //update room
            room = await Room.findByIdAndUpdate(req.params.id, { $set: newRoom }, { new: true })
            res.json({ message: "Room succesfully updated", room })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

//Route 5: delete notes using DELETE '/api/notes/deletenote' Login required

router.delete('/deleteroom/:id', adminVerify,
    async (req, res) => {
        try {
            //find the room
            let room = await Room.findById(req.params.id);
            if (!room) { return res.status(404).send("Not Found") }

            //delete room
            room = await Room.findByIdAndDelete(req.params.id)
            success = true;
            res.json({ message: "Room succesfully deleted", room })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })
module.exports = router




