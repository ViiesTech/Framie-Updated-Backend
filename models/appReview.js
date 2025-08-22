const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appReviewSchema = new Schema({
    type: {
        type: String,
        enum: ["App", "Service", "Stylist"],
        required: true,
    },
    reviewBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adminId:{
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    onService: {
        type: Schema.Types.ObjectId,
        ref: "Subservice"
    },
    onStylist:{
        type: Schema.Types.ObjectId,
        ref: "Stylist"
    },
    stars:{
        type: Number,
        enum:[1, 2, 3, 4, 5,],
        required: true
    },
    review:{
        type: String,
        required: true
    }
}, {timestamps: true});

const appReviewModel = mongoose.model("AppReview", appReviewSchema);
module.exports = appReviewModel;