require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // console.log("URL :", process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is Successfully Connected!");
    } catch (error) {
        console.log("Having Errors in DB Connection: ", error);
    }
};

module.exports = connectDB;