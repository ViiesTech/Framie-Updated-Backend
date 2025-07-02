const campaginModel = require("../models/campagin");

const addCamapgin = async (req) => {
    const newCampaign = new campaginModel(req.body);
    const result = await newCampaign.save();
    return result
};

const getCampagin = async (req) => {
    const { campaingId } = req.query;
    const result = await campaginModel.findById({_id: campaingId});
    return result;
};

const getAllCampaigns = async (req) => {
    const { adminId } = req.query;
    const result = await campaginModel.find({adminId: adminId});
    return result;
};

const updateCampaigns = async (req) => {
    const { campaingId } = req.body;
    const updatedData = req.body;
    const result = await campaginModel.findByIdAndUpdate({_id: campaingId},
        { $set: updatedData },
        { new: true }
    );
    return result
};

const deleteCampagin = async (req) => {
    const { campaingId } = req.query;
    const result = await campaginModel.findByIdAndDelete({_id: campaingId});
    return result
};

module.exports = {
    addCamapgin,
    getCampagin,
    getAllCampaigns,
    updateCampaigns,
    deleteCampagin
};