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
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    services:{
        type: Schema.Types.ObjectId,
        ref: "Subservice",
        required: true
    },
    stylist:{
        type: Schema.Types.ObjectId,
        ref: "Stylist",
    },
    previousStylist:{
        type: Schema.Types.ObjectId,
        ref: "Stylist"
    },
    timeSlot:{
        type: String,
        required: true,
    },
    previousSlot: {
        type: String,
    },
    previousDate: {
        type: String,
    },
    notes:{
        type: String,
    },
    price:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum:["Pending", "Accepted", "Completed", "Cancelled", "Rescheduled", "Request"],
        default: "Pending"
    },
    cancelledByModel: {
        type: String,
        enum:["User", "Stylist", "Admin"]
    },
    cancelledBy:{
        type: Schema.Types.ObjectId,
        refPath:"cancelledByModel",
    },
    cancelationReason: {
        type: String
    },
    rescheduledReason: {
        type: String
    }
}, { timestamps: true })

const appointmointModel = mongoose.model("Appointment", appointmointSchema)
module.exports = appointmointModel; 