const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingSchema = new Schema ({
    adminId:{
        type: Schema.Types.ObjectId,
        ref:"Admin",
        required: true,
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
    },
    countryRegion:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    appartment:{
        type: String,
    },
    postCode:{
        type: String,
    },
    city:{
        type: String,
        required: true
    },
    phNumber:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    differentAddress:{
        type: Boolean,
        default: false
    },
    order:{
        type: String,
    },
}, { timestamps: true});

const billingModel = mongoose.model("BillingDetail", billingSchema);
module.exports = billingModel;