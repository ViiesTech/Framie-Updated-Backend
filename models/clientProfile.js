const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientProfileSchema = new Schema({
    adminId:{
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    previousAppointments: [{
        type: Schema.Types.ObjectId,
        ref: "Appointment",
    }],
    stylists:[{
        type: Schema.Types.ObjectId,
        ref: "Employee",
    }],
    notes: [{
        text: { type: String },
        date: { type: String }
    }]
});

const clientProfileModel = mongoose.model("ClientProfile", clientProfileSchema);
module.exports = clientProfileModel;