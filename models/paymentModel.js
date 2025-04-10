const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payemntSchema = new Schema({
    type: {
        type: String,
        enum: ["User", "Admin"],
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:["User", "Admin"],
        required: true
    },
    cardNo: {
        type: Number,
        requried: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    securityCode: {
        type: Number,
        required: true
    },
    nameOnCard: {
        type: String,
        required: true
    },

});

const paymentModel = mongoose.model("PaymentMethod", payemntSchema);
module.exports = paymentModel;