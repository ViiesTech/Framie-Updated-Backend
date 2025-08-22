const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stylistSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    salonId:{
        type: Schema.Types.ObjectId,
        ref:"BusinessProfile",
        required: true
    },
    email:{
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true
    },
    stylistName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    stylistImage: {
        type: String,
        required: true,
    },
    workinDays: [{
        day:{
            type: String,
            enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        }
    }],
    availableServices: [{
        type: Schema.Types.ObjectId,
        ref: "Subservice",
    }]
});

const stylistModel = mongoose.model("Stylist", stylistSchema);
module.exports = stylistModel;