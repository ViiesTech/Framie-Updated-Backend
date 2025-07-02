const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaginSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    type: {
        type: String,
        enum: ["OnVisit", "amountSpent"]
    },
    threshold:{
        type: Number,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const campaginModel = mongoose.model("Campagin", campaginSchema);
module.exports = campaginModel;