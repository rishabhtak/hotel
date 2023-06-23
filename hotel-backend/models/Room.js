const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
    },
    capacity: {
        type: Number,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("room", RoomSchema);