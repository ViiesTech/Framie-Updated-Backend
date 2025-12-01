const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardSchema = new Schema({
    salon: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },

    // “visit” or “amount”
    type: { type: String, enum: ["visit", "amount"], required: true },

    // Visit-based rewards: example → 5 visits
    visitCount: { type: Number, default: null },

    // Amount-based rewards: example → 2000
    amountSpend: { type: Number, default: null },

    // Percent discount to apply (like 10%, 20%)
    discountPercent: { type: Number, required: true, min: 1, max: 100 },

    // Whether this reward is active
    isActive: { type: Boolean, default: true },

    // Soft delete option if needed
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

// Optional: hide deleted records automatically
RewardSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

const Reward = mongoose.model("Reward", RewardSchema);
module.exports = Reward
