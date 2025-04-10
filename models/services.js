const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    Title: {
        type: String,
        enum:["Hair Services", "Skin Services", "Nail Services", "Others Services"],
        required: true
    },
    bannerImage:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
}, { timestamps: true });

const serviceModel = mongoose.model("Service", serviceSchema);
module.exports = serviceModel;