const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const royalitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adminId:{
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    royality:[{
        subServices:{
            type: Schema.Types.ObjectId,
            ref: "Subservice",
        },
        points: {
            type: Number
        }
    }],
    totalPoints: {
        type: Number
    },
});

const royalityModel = mongoose.model("RoyalityPoint", royalitySchema);
module.exports = royalityModel;

// subServices: [{
//     type: Schema.Types.ObjectId,
//     ref: "Subservice",
//     required: true
// }],