const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: {
        type: String,
        requried: true
    },
    lastName: {
        type: String,
        requried: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phNumber: {
        type: Number,
        requried: true
    },
    city: {
        type: String,
        requried: true
    },
    address:{
        type: String
    },
    about:{
        type: String
    },
    gender:{
        type: String,
        enum: ["Male", "Female"]
    },
    profileImage: {
        type: String,
        requried: true
    },
    services:{
        type:Boolean,
        default: false
    },
    billingDetails: {
        type: Boolean,
        default: false
    },
    businessProfile:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;