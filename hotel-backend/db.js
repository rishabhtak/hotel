const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/hotel-backend?directConnection=true&tls=false&readPreference=primary";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('Mongoose Connected!'));
}


module.exports = connectToMongo;