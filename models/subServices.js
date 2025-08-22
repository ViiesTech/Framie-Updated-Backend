const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subServiceSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref:"Admin",
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    assignedTo: [{
        type: Schema.Types.ObjectId,
        ref:"Stylist",
    }],
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    subServiceImage:[{
        type: String,
        required: true,
    }],
    price:{
        type: Number,
        required: true,
    },
}, { timestamps: true });

const subServiceModel = mongoose.model("Subservice", subServiceSchema);
module.exports = subServiceModel;