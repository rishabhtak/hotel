const express = require('express');
const RoomDetail = require('../models/RoomDetail');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { roomImgResize, uploadPhoto } = require("../middleware/uploadImage");
const updateImage = require("../middleware/updateImage");
const adminVerify = require('../middleware/adminVerify');


router.post('/addroomdetail', adminVerify,
    uploadPhoto.array("images", 4),
    roomImgResize,
    [
        body('roomType', "Please enter atleast 3 letters").isLength({ min: 3 }),
        body('features', "Please write atleast 1 features").not().isEmpty(),
        body('description', "Please write description").not().isEmpty(),
    ],

    async (req, res) => {
        try {
            //validation error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ message: "Validation Error", error: errors.array() })
            }
            //create image name
            const imageName = req.files.map(file => file.filename);

            const { roomType, features, description } = req.body;
            const newRoomDetail = new RoomDetail({
                roomType,
                images: imageName,
                features,
                description
            })
            const saveRoomDetail = await newRoomDetail.save();
            res.json({ message: "Room detail successfully Added", saveRoomDetail })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }
    })

router.put('/updateroomdetail/:id', adminVerify, uploadPhoto.array("images", 4),
    roomImgResize, updateImage, [
    body('roomType', "Please enter atleast 3 letters").isLength({ min: 3 }),
    body('features', "Please write atleast 1 features").not().isEmpty(),
    body('description', "Please write atleast 5 letters").isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const { roomType, features, description } = req.body;
            //validation result
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })

            }
            //find the roomdetail object
            let roomDetail = await RoomDetail.findById(req.params.id);
            if (!roomDetail) { return res.status(404).send("Not Found") }
            // delete old room images
            /*    if (roomDetail.images.length > 0) {
                    for (const imageName of roomDetail.images) {
                        fs.unlinkSync(`public/images/rooms/${imageName}`);
                    }
                }
                else {
                    return res.status(400).json({ message: "Some error occured,Images not removed" })
                } */

            //create image name
            let imageName = req.updateImageName;
            const files = req.files;
            for (const file of files) {
                const { filename } = file;
                imageName.push(filename);
            }
            //create newRoomDetail object
            const newRoomDetail = {};
            if (roomType) { newRoomDetail.roomType = roomType }
            if (description) { newRoomDetail.description = description }
            if (features) { newRoomDetail.features = features }
            if (imageName) { newRoomDetail.images = imageName }

            //update room
            roomDetail = await RoomDetail.findByIdAndUpdate(req.params.id, { $set: newRoomDetail }, { new: true })
            res.json({ message: "Room detail successfully updated", roomDetail })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

// delete roomdetails
router.delete('/deleteroomdetail/:id', adminVerify,
    async (req, res) => {
        try {
            //delete the room images
            let roomDetail = await RoomDetail.findById(req.params.id);
            if (!roomDetail) { return res.status(404).send("Not Found") }
            roomDetail.images.forEach(filename => {
                try {
                    fs.unlinkSync(`public/images/rooms/${filename}`)
                    //image removed
                } catch (err) {
                    return res.status(400).json({ message: "Images not removed", error: err })
                }
            });

            //delete roomdetail
            roomDetail = await RoomDetail.findByIdAndDelete(req.params.id)
            res.json({ message: "Room detail successfully deleted", roomDetail })
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }

    })

// get room details
router.get('/getRoomDetail', async (req, res) => {
    try {
        const roomDetail = await RoomDetail.find({});
        if (roomDetail.length > 0) {
            res.json({ message: "room successfully deleted", roomDetail })
        }
        else {
            res.json({ message: "No room detail available", roomDetail })
        }

    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})

module.exports = router