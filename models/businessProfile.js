const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salonSchema = new Schema({
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
    categories:[{
        type: Schema.Types.ObjectId,
        ref: "Category",
        requried: true
    }],
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

salonSchema.index({ location: "2dsphere" });

const salonModel = mongoose.model("Salon", salonSchema);
module.exports = salonModel;