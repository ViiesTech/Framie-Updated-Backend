const adminModel = require("../models/AdminModel");
const salonModel = require("../models/businessProfile");
const { options } = require("../routes/admin");

const addBusinessProfile = async (req) => {
    const categories = JSON.parse(req.body.categories);
    const workingDays = JSON.parse(req.body.workingDays); 
    const location = {
            type: "Point",
            coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
            locationName: req.body.locationName || null
        };
    const newBusiness = new salonModel(req.body);
    newBusiness.categories = categories;
    newBusiness.workingDays = workingDays;
    newBusiness.profileImage = req.file.filename;
    newBusiness.location = location
    const result = await newBusiness.save();
    return result;
};

const getBusinessProfile = async (req) => {
    let adminId = {};
    if(req.query){
        adminId = req.query.adminId;
        console.log("adminId Query:", adminId)
    }
    if(req.admin){
        adminId = req.admin.id
        console.log("adminId Token:", adminId)
    };
    // return
    const businessProfile = await salonModel.findOne({adminId: adminId}).populate("categories");
    return businessProfile;
};

const updateBusinessProfile = async (req) => {
    const adminId = req.admin.id;
    const updatedData = req.body;
    if(updatedData.availableServices){
        updatedData.availableServices = JSON.parse(updatedData.availableServices);
    };
    if(updatedData.workingDays){
        updatedData.workingDays = JSON.parse(updatedData.workingDays);
    };
    if(req.file && req.file.filename){
        updatedData.profileImage = req.file.filename
    };
    if(updatedData.longitude && updatedData.latitude){
        updatedData.location = {
            type: "Point",
            coordinates: [parseFloat(updatedData.longitude), parseFloat(updatedData.latitude)],
            locationName: updatedData.locationName || null
        }
    };
    const updatedProfile = await salonModel.findOneAndUpdate({adminId: adminId}, { $set: updatedData }, { new: true });
    return updatedProfile;
};

const getAllBusinessProfiles = async (req) => {
    const { adminId, businessName, categoryId } = req.query;
    const filter = {};
    if(adminId){
        filter.adminId = adminId
    };
    if(businessName){
        filter.businessName = { $regex: businessName, options: "i" }
    };
    if(categoryId){
        filter.categories = { $in: [categoryId] }
    }
    const allProfiles = await salonModel.find(filter);
    return allProfiles;
};

const getNearByBusinessProfiles = async (req) => {
    const { longitude, latitude } = req.query;

    const location = {
        type: "Point",
        coordinates: [
            parseFloat(longitude),
            parseFloat(latitude)
        ]
    };

    const business = await salonModel.find({
        location:{
            $near:{
                $geometry: {
                    type: "Point",
                    coordinates: location.coordinates
                },
                $maxDistance: 100000
            }
        }
    }); 
    return business
}; 

module.exports = { 
    addBusinessProfile,
    getBusinessProfile,
    updateBusinessProfile,
    getAllBusinessProfiles,
    getNearByBusinessProfiles,
};