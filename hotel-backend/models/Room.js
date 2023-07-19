const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
    roomType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,

    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("room", RoomSchema);