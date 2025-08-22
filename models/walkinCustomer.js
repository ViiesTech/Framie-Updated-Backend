const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walkinSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    subService: {
        type: Schema.Types.ObjectId,
        ref: "Subservice",
        required: true
    },
    stylist: {
        type: Schema.Types.ObjectId,
        ref: "Subservice",
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const walkinModel = mongoose.model("WalkinCustomer", walkinSchema);
module.exports = walkinModel;