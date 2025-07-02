const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    employeeImage: {
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
        // required: true,
    }]
});

const employeeModel = mongoose.model("Employee", employeeSchema);
module.exports = employeeModel;