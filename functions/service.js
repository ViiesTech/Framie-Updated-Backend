const stylistModel = require("../models/stylist");
const serviceModel = require("../models/services");
const subServiceModel = require("../models/subServices");
const { options } = require("../routes/admin");

// Add Services
const addService = async (req) => {
    console.log("Path :", req.file.path)
    let { adminId, Title } = req.body; 
    const exist = await serviceModel.findOne({adminId: adminId,  Title: Title});
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
    const allServices = await serviceModel.find({adminId: adminId}).populate("categoryId");
    return allServices;
};

const getAllservices = async (req) => {
    const { adminId, categoryId } = req.query;
    // console.log("object: ", adminId);
    const filter = {};
    if(adminId){
        filter.adminId = adminId;
    };
    if(categoryId){
        filter.categoryId = categoryId;
    };
    const allServices = await serviceModel.find(filter).populate("categoryId")
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

const getAllSubServicesByAdminId = async (req) => {
    const adminId = req.admin._id
    const subServices = await subServiceModel.find({adminId: adminId}).populate("categoryId").populate("serviceId").populate({
        path: "assignedTo",
        select: "createdBy salonId stylistName stylistImage"
    });
    return subServices;
};

const getSubServiceById = async (req) => {
    const { subServiceId } = req.query;
    const subService = await subServiceModel.findById(subServiceId).populate({
        path: "assignedTo",
        select: "createdBy salonId stylistName stylistImage"
    });;
    return subService;
};

const getAllSubServices = async (req) => {
    const { adminId, categoryId, serviceId, stylistId } = req.query;
    const filter = {};
    if(adminId){
        filter.adminId = adminId;
    };
    if(categoryId){
        filter.categoryId = categoryId;
    }
    if(serviceId){
        filter.serviceId = serviceId;
    };
    if(stylistId){
        filter.assignedTo = { $in: [stylistId] };
    }
    const subServices = await subServiceModel.find(filter).populate({
        path: "assignedTo",
        select: "createdBy salonId stylistName stylistImage"
    });;
    return subServices;
};

const assignStylistToService = async (req) =>{
    const { subServiceId, stylistId } = req.query;
    const subService = await subServiceModel.findById(subServiceId);
    if(subService.assignedTo.includes(stylistId)){
        const unAssign = await subServiceModel.findByIdAndUpdate(subServiceId,
            { $pull: { assignedTo: stylistId}},
            { new: true }
        );
        const stylist = await stylistModel.findByIdAndUpdate(stylistId, 
            { $pull: { availableServices: subServiceId }},
            { new: true }
        );
        return unAssign
    } else {
        const assign = await subServiceModel.findByIdAndUpdate({_id: subServiceId},
            { $push: {assignedTo: stylistId}},
            { new: true}
        );
        const stylist = await stylistModel.findByIdAndUpdate(stylistId, 
            { $push: { availableServices: subServiceId } },
            { new: true }
        );
        return assign;
    }
};

const deleteSubService = async (req) => {
    const { subServiceId } = req.query;
    const result = await subServiceModel.findByIdAndDelete({_id: subServiceId});
    return result;
};

// const getAllSubServicesByAdminIdForUser = async (req) => {
//     const adminId = req.query.adminId;
//     console.log("AdminId :", adminId);
//     const subServices = await subServiceModel.find({adminId: adminId}).populate({
//         path: "serviceId",
//         select: "Title text bannerImage"
//     });
//     return subServices;
// };

module.exports = {
    addService,
    getAllservicesByAdminId,
    getAllservices,
    updatedService,
    deleteServices,
    addSubService,
    getSubServiceById,
    // getAllsubServicesByServiceId,
    getAllSubServicesByAdminId,
    getAllSubServices,
    updatedSubService,
    assignStylistToService,
    deleteSubService,
    // getAllSubServicesByAdminIdForUser
};