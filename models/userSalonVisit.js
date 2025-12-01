const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSalonVisitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    salon: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    totalVisits: { type: Number, default: 0 },  // total visits made
    rewardsClaimed: [{
        reward: { type: Schema.Types.ObjectId, ref: "Reward" },
        claimedAt: { type: Date, default: Date.now },
        usedVisits: { type: Number }, // number of visits used for this reward
        type: { type: String },          // "visit" or "amount"
        discountPercent: { type: Number },
        amountSpend: { type: Number },
        originalPrice: { type: Number },
        discountedPrice: { type: Number },
    }]
}, { timestamps: true });

UserSalonVisitSchema.index({ user: 1, salon: 1 }, { unique: true });

module.exports = mongoose.model("UserSalonVisit", UserSalonVisitSchema);
