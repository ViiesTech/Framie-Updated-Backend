const stylistModel = require("../models/stylist");
const subServiceModel = require("../models/subServices");
const bcrypt = require("bcrypt");

const addStylist = async (req) => {
    // console.log("data: ", req.body);
    const workingDays = JSON.parse(req.body.workingDays);
    const availableServices = JSON.parse(req.body.availableServices);
    const hash = await bcrypt.hash(req.body.password, 10);
    const newStylist = new stylistModel(req.body);
    newStylist.stylistImage = req.file.filename;
    newStylist.workinDays = workingDays;
    newStylist.password = hash;
    newStylist.availableServices = availableServices;
    const result = await newStylist.save(); 
    return result
};

const getAllStylistsByAdmin = async (req) => {
    const adminId = req.query.adminId;
    const allStylists = await stylistModel.find({createdBy: adminId}).select("-password").populate({
        path: "availableServices",
        // select: "_id serviceId",
        populate:{
            path: "serviceId",
            model: "Service",
            select: "Title"
        }
    });
    return allStylists;
};

const getStylist = async (req) => {
    const { email } = req.body;
    const stylist = await stylistModel.findOne({email: email});
    return stylist
};

const getStylistProfile = async (req, userId) => {
    let stylistId = {};
    if(req.query){
        stylistId = req.query.stylistId
    };
    if(userId){
        stylistId = userId
    };
    console.log("StylistId :", stylistId);
    const stylist = await stylistModel.findById(stylistId).select("-password").populate("availableServices");
    console.log("Stylist Data :", stylist);
    return stylist
};

const updateStylist = async (req) => {
    const { stylistId } = req.body;
    const updatedData = req.body;
    if(req.body.workinDays){
        updatedData.workinDays = JSON.parse(updatedData.workingDays);
    };

    if(req.file && req.file.filename){
        updatedData.stylistImage = req.file.filename
    };

    if(req.body.availableServices){
        updatedData.availableServices = JSON.parse(updatedData.availableServices);
    }
     
    const updatedStylist = await stylistModel.findOneAndUpdate(stylistId, 
        { $set: updatedData }, 
        { new: true}
    );
    return updatedStylist
};

const addSubservicesToStylist = async (req) =>{
    const { subServiceId, stylistId } = req.body;
    const stylist = await stylistModel.findById(stylistId);
    if(stylist.availableServices.includes(subServiceId)){
        const stylist = await stylistModel.findByIdAndUpdate(stylistId, 
            { $pull: { availableServices: subServiceId }},
            { new: true }
        ).select("-password");
        const unAssign = await subServiceModel.findByIdAndUpdate(subServiceId,
            { $pull: { assignedTo: stylistId}},
            { new: true }
        );
        return stylist
    } else {
        const stylist = await stylistModel.findByIdAndUpdate(stylistId, 
            { $push: { availableServices: subServiceId } },
            { new: true }
        ).select("-password");
        const assign = await subServiceModel.findByIdAndUpdate({_id: subServiceId},
            { $push: {assignedTo: stylistId}},
            { new: true}
        );
        return stylist;
    }
};

const deleteStylist = async (req) => {
    const { stylistId } = req.query;
    const result = await stylistModel.findByIdAndDelete({_id: stylistId});
    return result
};

module.exports = { 
    addStylist,
    getAllStylistsByAdmin,
    getStylist,
    getStylistProfile,
    updateStylist,
    addSubservicesToStylist,
    deleteStylist
};
