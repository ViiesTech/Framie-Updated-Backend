const mongoose = require('mongoose');
const salonModel = require("../models/businessProfile");
const { createRewardValidation } = require('../validation/reward');
const Reward = require('../models/reward');
const userSalonVisit = require('../models/userSalonVisit');
const userModel = require('../models/userModel');

const createReward = async (req, res) => {
    try {
        const { salonId } = req.query;
        const { type, visitCount, amountSpend, discountPercent, isActive } = req.body

        if (!mongoose.Types.ObjectId.isValid(salonId)) {
            return res.status(400).json({ success: false, msg: "Invalid salonId" });
        }

        const salon = await salonModel.findById(salonId);
        if (!salon) {
            return res.status(404).json({ success: false, msg: "Salon not found" });
        }

        const reward = await Reward.create({
            salon: salonId,
            admin: salon.adminId,
            type,
            visitCount: visitCount || null,
            amountSpend: amountSpend || null,
            discountPercent,
            isActive: typeof isActive === "boolean" ? isActive : true
        });

        // await reward.populate([{ path: 'salon' }, { path: 'admin' }])
        return res.status(201).json({
            success: true, msg: "Reward created successfully", reward
        });

    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({ success: false, msg: "Having Errors!", error })
    }
}

const updateReward = async (req, res) => {
    try {
        const { rewardId } = req.params;
        let updates = { ...req.body };

        if (!mongoose.Types.ObjectId.isValid(rewardId)) {
            return res.status(400).json({ success: false, msg: "Invalid rewardId" });
        }

        if (updates.type === "visit") {
            updates.amountSpend = null;
        } else if (updates.type === "amount") {
            updates.visitCount = null;
        }

        const reward = await Reward.findByIdAndUpdate(rewardId, updates, { new: true });
        if (!reward) {
            return res.status(404).json({ success: false, msg: "Reward not found" });
        }

        await reward.populate([
            { path: "salon", select: '_id businessName profileImage' },
            { path: "admin", select: 'firstName lastName _id' }
        ]);

        res.status(200).json({ success: true, msg: "Reward updated successfully", reward });

    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({ success: false, msg: "Having Errors!", error })
    }
};

const deleteReward = async (req, res) => {
    try {
        const { rewardId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(rewardId)) {
            return res.status(400).json({ success: false, msg: "Invalid rewardId" });
        }

        const reward = await Reward.findByIdAndUpdate(
            rewardId,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (!reward) {
            return res.status(404).json({ success: false, msg: "Reward not found" });
        }

        res.status(200).json({ success: true, msg: "Reward deleted successfully", reward });

    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({ success: false, msg: "Having Errors!", error })
    }
};

const getReward = async (req, res) => {
    try {
        const { rewardId } = req.params;
        const { salonId } = req.query;

        if (rewardId) {
            if (!mongoose.Types.ObjectId.isValid(rewardId)) {
                return res.status(400).json({ success: false, msg: "Invalid rewardId" });
            }

            const reward = await Reward.findById(rewardId).populate([
                { path: "salon", select: '_id businessName profileImage' },
                { path: "admin", select: 'firstName lastName _id' }
            ]);

            if (!reward) {
                return res.status(404).json({ success: false, msg: "Reward not found" });
            }

            return res.status(200).json({ success: true, reward });
        }

        const filter = {};

        if (salonId) {
            if (!mongoose.Types.ObjectId.isValid(salonId)) {
                return res.status(400).json({ success: false, msg: "Invalid salonId" });
            }
            filter.salon = salonId;
        }

        const rewards = await Reward.find(filter).populate([
            { path: "salon", select: '_id businessName profileImage' },
            { path: "admin", select: 'firstName lastName _id' }
        ]);

        return res.status(200).json({ success: true, rewards });

    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({ success: false, msg: "Having Errors!", error })
    }
};
const checkUserReward = async (req, res) => {
    try {
        const { userId, salonId, amount } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(salonId)) {
            return res.status(400).json({ success: false, msg: "Invalid userId or salonId" });
        }
        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ success: false, msg: "Amount must be a positive number" });
        }
        const reward = await Reward.findOne({ salon: salonId, isActive: true });
        const user = await userModel.findOne({ _id: userId });
        const salon = await salonModel.findOne({ _id: salonId });
        if (!user) return res.status(404).json({ success: false, msg: "User not found" });
        if (!salon) return res.status(404).json({ success: false, msg: "Salon not found" });
        if (!reward) return res.status(404).json({ success: false, msg: "No reward available for this salon" });

        if (reward.type === "amount") {
            // Amount-based reward: check minimum amountSpend
            if (amount < reward.amountSpend) {
                return res.status(400).json({
                    success: false,
                    msg: `You need to spend at least ${reward.amountSpend} to use this reward`
                });
            }

            const payAfterDiscount = amount - (amount * reward.discountPercent) / 100;
            return res.status(200).json({
                success: true,
                msg: "Reward applicable!",
                rewardType: "amount",
                discountPercent: reward.discountPercent,
                payAfterDiscount
            });

        } else if (reward.type === "visit") {
            // Visit-based reward: check user's total visits in this salon
            const userVisit = await userSalonVisit.findOne({ user: userId, salon: salonId });
            const totalVisits = userVisit ? userVisit.totalVisits : 0;

            if (totalVisits < reward.visitCount) {
                return res.status(400).json({
                    success: false,
                    msg: `You need ${reward.visitCount} visits to use this reward. You have ${totalVisits}.`
                });
            }

            const payAfterDiscount = amount - (amount * reward.discountPercent) / 100;
            return res.status(200).json({
                success: true,
                msg: "Reward applicable!",
                rewardType: "visit",
                discountPercent: reward.discountPercent,
                payAfterDiscount,
                remainingVisits: totalVisits - reward.visitCount
            });
        }
        return res.status(400).json({ success: false, msg: "Invalid reward type" });

    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({ success: false, msg: "Having Errors!", error })
    }
}

const claimReward = async (req, res) => {
    try {
        const { userId, salonId, amount } = req.body;

        if (!userId || !salonId) {
            return res.status(400).json({ success: false, msg: "userId and salonId are required" });
        }

        if (!amount) {
            return res.status(400).json({ success: false, msg: "Amount is required to calculate discounted price" });
        }

        // 1) Find reward for this salon
        const reward = await Reward.findOne({ salon: salonId, isActive: true });
        const user = await userModel.findOne({ _id: userId });
        const salon = await salonModel.findOne({ _id: salonId });
        if (!user) return res.status(404).json({ success: false, msg: "User not found" });
        if (!salon) return res.status(404).json({ success: false, msg: "Salon not found" });
        if (!reward) return res.status(404).json({ success: false, msg: "No reward available for this salon" });

        // 2) Find or create user visit document
        let userVisit = await userSalonVisit.findOne({ user: userId, salon: salonId });

        if (!userVisit) {
            userVisit = await userSalonVisit.create({
                user: userId,
                salon: salonId,
                totalVisits: 0,
                rewardsClaimed: []
            });
        }

        const responseData = {
            success: true,
            rewardType: reward.type
        };

        // CASE 1: Reward Type = AMOUNT
        if (reward.type === "amount") {

            const discountPercent = reward.discountPercent || 0;
            const discountValue = (amount * discountPercent) / 100;
            const discountedPrice = amount - discountValue;

            responseData.msg = "Reward claimed successfully!";
            responseData.discountPercent = discountPercent;
            responseData.originalPrice = amount;
            responseData.discountedPrice = discountedPrice;

            // Save claimed info but no visit deduction
            userVisit.rewardsClaimed.push({
                reward: reward._id,
                usedVisits: 0,
                type: reward.type,
                discountPercent: reward.discountPercent,
                amountSpend: reward.amountSpend,
                originalPrice: amount,
                discountedPrice
            });
            await userVisit.save();

            return res.json(responseData);
        }

        // CASE 2: Reward Type = VISIT
        if (reward.type === "visit") {

            const requiredVisits = reward.visitCount || 0;

            if (userVisit.totalVisits < requiredVisits) {
                return res.status(400).json({
                    success: false,
                    msg: `You have ${userVisit.totalVisits} visits. You need ${requiredVisits} visits to claim this reward.`,
                    userVisits: userVisit.totalVisits,
                    neededVisits: requiredVisits - userVisit.totalVisits
                });
            }

            // Deduct visits
            userVisit.totalVisits -= requiredVisits;

            const discountPercent = reward.discountPercent || 0;
            const discountValue = (amount * discountPercent) / 100;
            const discountedPrice = amount - discountValue;

            // Save claiming record
            userVisit.rewardsClaimed.push({
                reward: reward._id,
                usedVisits: requiredVisits,
                type: reward.type,
                discountPercent: reward.discountPercent,
                amountSpend: reward.amountSpend,
                originalPrice: amount,
                discountedPrice
            });

            await userVisit.save();

            return res.json({
                success: true,
                msg: "Reward claimed successfully using visits!",
                rewardType: "visit",
                usedVisits: requiredVisits,
                remainingVisits: userVisit.totalVisits,
                discountPercent,
                originalPrice: amount,
                discountedPrice
            });
        }

        return res.status(400).json({ success: false, msg: "Invalid reward type" });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message
        });
    }
};

const getVisit = async (req, res) => {
    try {
        const { userId, salonId } = req.query;

        if (!userId && !salonId) {
            return res.status(400).json({
                success: false, message: "Please provide userId or salonId"
            });
        }

        let query = {};

        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ success: false, msg: "Invalid userId" });
            }
            query.user = userId;
        }

        if (salonId) {
            if (!mongoose.Types.ObjectId.isValid(salonId)) {
                return res.status(400).json({ success: false, msg: "Invalid salonId" });
            }
            query.salon = salonId;
        }

        const visits = await userSalonVisit.find(query)
            .populate({ path: "user", select: "_id firstName lastName profileImage email phNumber" })
            .populate({ path: "salon", select: '_id businessName profileImage' })

        if (!visits || visits.length === 0) {
            return res.status(404).json({
                success: false, msg: "No visit records found"
            });
        }

        return res.status(200).json({
            success: true, message: 'Visit fetched successfully', visits
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    createReward, updateReward, deleteReward, getReward, checkUserReward, claimReward , getVisit
}