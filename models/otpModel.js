const mongoose = require('mongoose');
const Schema = mongoose.Schema

const optSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    email:{
        type: String
    },
    OTP: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 300,
    }
});

const OTPModel = mongoose.model("OTP", optSchema);
module.exports = OTPModel;