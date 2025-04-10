const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phNumber: {
        type: Number,
        required: true
    },
    city:{
        type: String,
        requird: true,
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    houseNo: {
        type: String,
    },
    street:{
        type: String,
    },
    postcode:{
        type: String,
    },
    addressType: {
        type: String,
        enum: ["Home", "Apartment"],
    },
    customerAddress: {
        type: String,
    },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;