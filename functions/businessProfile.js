const adminModel = require("../models/AdminModel");
const businessModel = require("../models/businessProfile");

const addBusinessProfile = async (req) => {
    const categories = JSON.parse(req.body.categories);
    const workingDays = JSON.parse(req.body.workingDays); 
    const location = {
            type: "Point",
            coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
            locationName: req.body.locationName || null
        };
    const newBusiness = new businessModel(req.body);
    newBusiness.categories = categories;
    newBusiness.workingDays = workingDays;
    newBusiness.profileImage = req.file.filename;
    newBusiness.location = location
    const result = await newBusiness.save();
    return result;
};

const getBusinessProfile = async (req) => {
    const adminId = req.admin.id;
    const businessProfile = await businessModel.findOne({adminId: adminId}).populate("categories");
    return businessProfile;
};

const updateBusinessProfile = async (req) => {
    const adminId = req.admin.id;
    const updatedData = req.body;
    updatedData.availableServices = JSON.parse(updatedData.availableServices);
    updatedData.workingDays = JSON.parse(updatedData.workingDays); 
    const updatedProfile = await businessModel.findOneAndUpdate({adminId: adminId}, { $set: updatedData }, { new: true });
    return updatedProfile;
};

const getAllBusinessProfiles = async (req) => {
    const allProfiles = await businessModel.find();
    return allProfiles;
};

const getNearByBusinessProfiles = async (req) => {
    const { logitude, latitude } = req.body;

    const location = {
        type: "Point",
        coordinates: [
            parseFloat(req.body.longitude),
            parseFloat(req.body.latitude)
        ]
    };

    const business = await businessModel.find({
        location:{
            $near:{
                $geometry: {
                    type: "Point",
                    coordinates: location.coordinates
                },
                $maxdDistance: 100000
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
};