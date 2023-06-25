const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    specialrequest: {
        type: String,
    },
    roomsid: {
        type: Array,
        required: true

    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },
    totalperson: {
        type: Number,
        required: true
    },
    roomtype: {
        type: String,
        required: true
    },
    totalroom: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("booking", BookingSchema);