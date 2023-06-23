const express = require('express');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const adminmiddle = require('../middleware/adminmiddle');

//Route 1:add a room using:POST "/api/rooms" .admin login reqired
router.post('/addroom', adminmiddle,
    [
        body('type', "Enter a valid type").isLength({ min: 3 }),
        body('price', "Enter a valid price").isInt(),
        body('size'),
        body('capacity', "Enter a valid capacity").isInt(),
        body('description').isLength({ min: 50 }),
    ],
    async (req, res) => {
        let success = false;
        try {

            const { type, price, size, capacity, description } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }
            const rooms = new Room({ type, price, size, capacity, description })
            const saveRoom = await rooms.save();
            success = true;
            res.json({ success, saveRoom })
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error");
        }

    })

//Route 2: get all rooms using GET '/room/getallrooms' .no login required

router.get('/getallrooms', async (req, res) => {
    try {
        let success = false;
        const rooms = await Room.find();
        success = true;
        res.json({ success, rooms })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Internal server error");
    }
})

//Route 3: get available room using POST '/api/room/getavailableroom/' No Login required

router.post('/getavailableroom', async (req, res) => {
    try {
        let success = false;
        const { from, to } = req.body;
        let bookedRooms = await Booking.find({
            $or: [
                { startdate: { $gte: from, $lte: to } },
                { enddate: { $gte: from, $lte: to } }
            ],
        })
        if (bookedRooms.length === 0) {
            const rooms = await Room.find();
            success = true;
            res.json({ success, rooms })
        }
        else {
            let bookedRoomsId = bookedRooms.map((room) => {
                return room.roomsId.join(',');
            })
            let str = bookedRoomsId.toString();
            let roomIdArray = str.split(',');
            const availableRooms = await Room.find({ '_id': { $nin: roomIdArray } });
            success = true;
            res.json({ success, availableRooms });
        }

    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})

//Route 4: update room details using PUT '/api/room/updateroom' Admin Login required

router.put('/updateroom/:id', adminmiddle, [
    body('type', "Enter a valid type").isLength({ min: 3 }),
    body('price', "Enter a valid price").isInt(),
    body('size'),
    body('capacity', "Enter a valid capacity").isInt(),
    body('description').isLength({ min: 50 }),
],
    async (req, res) => {
        try {
            let success = false;
            const { type, price, size, capacity, description } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            //create newRoom object
            const newRoom = {};
            if (type) { newRoom.type = type }
            if (description) { newRoom.description = description }
            if (price) { newRoom.price = price }
            if (size) { newRoom.size = size }
            if (capacity) { newRoom.capacity = capacity }



            //find the room
            let room = await Room.findById(req.params.id);
            if (!room) { return res.status(404).send("Not Found") }

            //update room
            room = await Room.findByIdAndUpdate(req.params.id, { $set: newRoom }, { new: true })
            success = true;
            res.json({ success, room })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

//Route 5: delete notes using DELETE '/api/notes/deletenote' Login required

router.delete('/deleteroom/:id', adminmiddle,
    async (req, res) => {
        try {
            let success = false;

            //find the room
            let room = await Room.findById(req.params.id);
            if (!room) { return res.status(404).send("Not Found") }

            //delete room
            room = await Room.findByIdAndDelete(req.params.id)
            success = true;
            res.json({ success, room })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })
module.exports = router




