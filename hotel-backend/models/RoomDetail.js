const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomDetailSchema = new Schema({
    roomType: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    totalRooms: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: true
    },
    features: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("roomdetail", RoomDetailSchema);