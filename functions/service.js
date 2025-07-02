const serviceModel = require("../models/services");
const subServiceModel = require("../models/subServices");

// Add Services
const addService = async (req) => {
    console.log("Path :", req.file.path)
    let { adminId, Title } = req.body; 
    const exist = await serviceModel.findOne({adminId: adminId, Title: Title});
    if(exist){
        // console.log("Exist", exist)
        return {data:exist, exist:true};
    } else {
        if(req.file && req.file.filename){
            const newService = new serviceModel(req.body);
            newService.bannerImage = req.file.filename;
            const result = await newService.save();
            return result;
        } else {
            const newService = new serviceModel(req.body);
            const result = await newService.save();
            return result
        }
    }
};

const updatedService = async (req) => {
    console.log("Path :", req.file.path);
    let { adminId, Title } = req.body;
    if(req.file && req.file.filename){
        const image = req.file.filename;
        const service = await serviceModel.findByIdAndUpdate(adminId,
            { $set: {bannerImage: image, text: Title}},
            { new: true}
        )
        return service
    } else {
        const service = await serviceModel.findByIdAndUpdate(adminId,
            { $set: {text: Title}},
            { new: true}
        )
        return service
    }
};

const getAllservicesByAdminId = async (req) => {
    const adminId = req.admin.id;
    const allServices = await serviceModel.find({adminId: adminId});
    return allServices;
};

const getAllservicesByAdmin = async (req) => {
    const {adminId} = req.query;
    console.log("object: ", adminId);
    const allServices = await serviceModel.find({adminId: adminId});
    return allServices;
};

const deleteServices = async (req) => {
    const { serviceId } = req.query;
    const result = await serviceModel.findByIdAndDelete({_id:serviceId});
    return result;
};

// Add SubServices
const addSubService = async (req) => {
    const price = Number(req.body.price);
    const imagefilename = req.files.map((file)=> file.filename);
    // console.log("object :", imagefilename);

    const newSubService = new subServiceModel(req.body);
    newSubService.price = price;
    newSubService.subServiceImage = imagefilename;
    const result = await newSubService.save();
    return result;
};

const updatedSubService = async (req) => {
    let { subServiceId } = req.body;
    console.log("object :", subServiceId);
    let updatedData =  req.body;
    if (req.files && req.files.length > 0) {
        const images = req.files.map(file => file.filename); 
        const service = await subServiceModel.findByIdAndUpdate({_id: subServiceId},
            { $set: {subServiceImage: images, updatedData}},
            { new: true}
        )
        return service
    } else {
        let updatedData =  req.body;
        const service = await subServiceModel.findByIdAndUpdate({_id: subServiceId},
            { $set: updatedData},
            { new: true}
        )
        return service
    }
};

const getAllsubServicesByServiceId = async (req) => {
    const serviceId = req.query;
    const subServices = await subServiceModel.find(serviceId).populate("assignedTo");
    return subServices
};

const getAllSubServicesByAdminId = async (req) => {
    const adminId = req.admin._id
    console.log("object :", adminId);
    const subServices = await subServiceModel.find({adminId: adminId});
    return subServices;
};

const getSubServiceById = async (req) => {
    const subServiceId = req.query.subServiceId;
    const subService = await subServiceModel.findById(subServiceId);
    return subService;
};

const getAllSubServicesByAdmin = async (req) => {
    const {adminId} = req.query;
    console.log("I'd :", adminId);
    const subServices = await subServiceModel.find({adminId: adminId});
    return subServices;
};

const assignEmployeeToService = async (req) =>{
    const { subServiceId, employeeId } = req.query;
    const assign = await subServiceModel.findByIdAndUpdate({_id: subServiceId},
        { $addToSet: {assignedTo: employeeId}},
        { new: true});
    return assign; 
};

const deleteSubService = async (req) => {
    const { subServiceId } = req.query;
    const result = await subServiceModel.findByIdAndDelete({_id: subServiceId});
    return result;
};

const getAllSubServicesByAdminIdForUser = async (req) => {
    const adminId = req.query.adminId;
    console.log("AdminId :", adminId);
    const subServices = await subServiceModel.find({adminId: adminId}).populate({
        path: "serviceId",
        select: "Title text bannerImage"
    });
    return subServices;
};

module.exports = {
    addService,
    getAllservicesByAdminId,
    getAllservicesByAdmin,
    deleteServices,
    addSubService,
    updatedSubService,
    getAllsubServicesByServiceId,
    getAllSubServicesByAdminId,
    getSubServiceById,
    getAllSubServicesByAdmin,
    assignEmployeeToService,
    deleteSubService,
    getAllSubServicesByAdminIdForUser
};