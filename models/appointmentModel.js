const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmointSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adminId:{
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    clientName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    services:[{
        type: Schema.Types.ObjectId,
        ref: "Subservice",
        required: true
    }],
    stylist:{
        type: Schema.Types.ObjectId,
        ref: "Employee",
    },
    timeSlot:{
        type: String,
        required: true,
    },
    notes:{
        type: String,
    },
    price:{
        type: Number,
        required: true
    },
    createdByModel: {
        type: String,
        required: true,
        enum:["User", "Admin"]
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        refPath:"createdByModel",
        required: true,
    },
    status: {
        type: String,
        enum:["Pending", "Accepted", "Completed"],
        default: "Pending"
    }
}, { timestamps: true })

const appointmointModel = mongoose.model("Appointment", appointmointSchema)
module.exports = appointmointModel; 