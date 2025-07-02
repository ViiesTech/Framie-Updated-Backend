const campaginFunction = require("../functions/campagin");

const addCamapgin = async (req, res) => {
    try {
        const campaign = await campaginFunction.addCamapgin(req);
        return res.status(200).json({
            success: true,
            msg: "Campaign Added!",
            data: campaign
        }) 
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        })
    }
};

const getCampagin = async (req, res) => {
    try {
        const campagin = await campaginFunction.getCampagin(req);
        return res.status(200).json({
            success: true,
            msg: "Campaign Details!",
            data: campagin
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        })
    }
};

const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await campaginFunction.getAllCampaigns(req);
        return res.status(200).json({
            success: true,
            msg: "All Campaigns By Admin",
            data: campaigns
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        })
    }
};

const updateCampaigns = async (req, res) => {
    try {
        const campaign = await campaginFunction.updateCampaigns(req);
        return res.status(200).json({
            success: true,
            msg: "Campaign Details Updated!",
            data: campaign
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        })
    }
};

const deleteCampagin = async (req, res) => {
    try {
        const campaign = await campaginFunction.deleteCampagin(req);
        return res.status(200).json({
            success: true,
            msg: "Campaign is Successfully Deleted!"
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        })
    }
};

module.exports = {
    addCamapgin,
    getCampagin,
    getAllCampaigns,
    updateCampaigns,
    deleteCampagin
};