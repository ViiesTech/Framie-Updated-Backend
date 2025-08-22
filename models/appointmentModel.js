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
    services:[{
        type: Schema.Types.ObjectId,
        ref: "Subservice",
        required: true
    }],
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
    notes:{
        type: String,
    },
    price:{
        type: Number,
        required: true
    },
    // createdByModel: {
    //     type: String,
    //     required: true,
    //     enum:["User", "Admin"]
    // },
    // createdBy:{
    //     type: Schema.Types.ObjectId,
    //     refPath:"createdByModel",
    //     required: true,
    // },
    status: {
        type: String,
        enum:["Pending", "Accepted", "Completed", "Cancelled", "Rescheduled"],
        default: "Pending"
    },
    cancelledByModel: {
        type: String,
        required: true,
        enum:["User", "Stylist"]
    },
    cancelledBy:{
        type: Schema.Types.ObjectId,
        refPath:"cancelledByModel",
        required: true,
    },
}, { timestamps: true })

const appointmointModel = mongoose.model("Appointment", appointmointSchema)
module.exports = appointmointModel; 