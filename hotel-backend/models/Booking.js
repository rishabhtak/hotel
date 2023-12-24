const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  specialRequest: {
    type: String,
  },
  roomDetails: [],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalRooms: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("booking", BookingSchema);
