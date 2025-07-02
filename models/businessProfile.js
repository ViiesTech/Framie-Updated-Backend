const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema({
    adminId:{
        type: Schema.Types.ObjectId,
        ref:"Admin",
        required: true,
    },
    profileImage:{
        type: String,
        required: true,
    },
    businessName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        // required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    availableServices:{
        type: [String],
        enum:["Hair Services", "Skin Services", "Nail Services", "Others Services"],
        required: true
    },
    workingDays:[{
        day:{
            type: String,
            enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        openingTime: {
            type: String,
            required: true,
        },
        closeingTime: {
            type: String,
            required: true,
        }
    }],
    location: {
        type:{
            type: String,
            enum: ["Point"] 
        },
        coordinates: {
            type: [Number],
        },
        locationName: {
            type: String
        }
    },
    favoriteBy:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

businessSchema.index({ location: "2dsphere" });

const businessModel = mongoose.model("BusinessDetail", businessSchema);
module.exports = businessModel;