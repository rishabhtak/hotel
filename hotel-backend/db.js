const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_SECRET;

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => console.log("Mongoose Connected!"));
};

module.exports = connectToMongo;
