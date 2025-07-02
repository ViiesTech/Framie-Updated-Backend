const royalityFunction = require("../functions/royalityPoint");

const getAllRoyalityProfileByUser = async (req, res) => {
    try {
        const royalityProfiles = await royalityFunction.getAllProfilesByUser(req);
        return res.status(200).json({
            success: true,
            msg: "All Royality Profiles of User",
            data: royalityProfiles
        });
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const getTotalRoyalityPointsByUser = async (req, res) => {
    try {
        const points = await royalityFunction.getTotalPointsByUser(req);
        const total = {
            OverAllTotal: points
        };
        return res.status(200).json({
            success: true,
            msg: "Total Royality Points By User",
            data: total
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const getAllRoyalityProfilesByAdmin = async (req, res) => {
    try {
        const profiles = await royalityFunction.getAllProfilesByAdmin(req);
        return res.status(200).json({
            success: true,
            msg: "All Client Profiles By Admin",
            data: profiles
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const getTotalRoyalityPointsByAdmin = async (req, res) => {
    try {
        const points = await royalityFunction.getTotalPointsByAdmin(req);
        const total = {
            OverAllTotal: points
        };
        return res.status(200).json({
            success: true,
            msg: "Total Royality Points By User",
            data: total
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const updateBusinessRoyalitypoints = async (req, res) => {
    try {
        const updated = await royalityFunction.businessRoyalityPoints(req);
        return res.status(200).json({
            success: true,
            msg: " Business Royality Points Updated & and Subservice points are disabled",
            data: updated
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const updateSubservicePoints = async (req, res) => {
    try {
        const updated = await royalityFunction.updatedSubServiceRoyalityPoints(req);
        return res.status(200).json({
            success: true,
            msg: "Business Royality points Removed! Subservice Point updated! Do Update All Subservice Points",
            data: updated
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const dashoboard = async (req, res) => {
    try {
        const dashboardData = await royalityFunction.dashBoardRoyality(req);
        return res.status(200).json({
            success: true,
            msg: "All Royality Data!",
            data: dashboardData
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const totalServicePoints = async (req, res) => {
    try {
        const totalServices = await royalityFunction.totalServicesPoints(req);
        return res.status(200).json({
            success: true,
            msg: "All Subservices And Total Points",
            data: totalServices
        })
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};

const pauseRoyality = async (req, res) => {
    try {
        const royality = await royalityFunction.pauseRoyalityPoints(req);
        return res.status(200).json({
            success: true,
            msg: "Royality Points Deleted!",
            data: royality
        });
    } catch (error) {
        console.log("Having Errors", error);
        return res.status(400).json({
            success: false,
            msg: "Having Errors", 
            error: error.message
        })
    }
};
module.exports = {
    getAllRoyalityProfileByUser,
    getTotalRoyalityPointsByUser,
    getAllRoyalityProfilesByAdmin,
    getTotalRoyalityPointsByAdmin,
    updateBusinessRoyalitypoints,
    updateSubservicePoints,
    dashoboard,
    totalServicePoints,
    pauseRoyality
};