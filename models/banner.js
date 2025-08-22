const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    bannerImage: {
        type: String,
        requried: true
    },
    description: {
        type: String,
        required: true
    },
    businessprofileId: {
        type: Schema.Types.ObjectId,
        ref: "BusinessDetail",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const bannerModel = mongoose.model("Banner", bannerSchema);
module.exports = bannerModel; 