const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phNumber: {
        type: Number,
        // required: true,
    },
    profileImage:{
        type: String
    },
    city:{
        type: String,
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
    location: {
        type:{
            type: String,
            enum: ["Point"] 
        },
        coordinates: {
            type: [Number],
        },
        locationName: {
            type: String
        }
    }
}, { timestamps: true });

userSchema.index({ location: "2dsphere" });


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;