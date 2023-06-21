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
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("booking", BookingSchema);