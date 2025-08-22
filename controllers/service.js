const serviceFunctions = require("../functions/service");

const addService = async (req, res) => {
    try {
        const service = await serviceFunctions.addService(req);
        if(service.exist){
            let data = service.data;
            return res.status(200).json({
                success: true,
                msg: "Service Already Exist!",
                data: data
            })    
        }
        return res.status(200).json({
            success: true,
            msg: "Service Added Successfully!",
            data: service
        }) 
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getAllservicesByAdminId = async (req, res) => {
    try {
        const allServices = await serviceFunctions.getAllservicesByAdminId(req);
        if(allServices.length === 0){
            return res.status(200).json({
                success: false,
                msg: "No Services Found By Admin!"
            });            
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Services By Admin",
                data: allServices
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getAllservices = async (req, res) => {
    try {
        const allServices = await serviceFunctions.getAllservices(req);
        if(allServices.length === 0){
            return res.status(403).json({
                success: false,
                msg: "No Services Found By AdminId",
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Services By Admin",
                data: allServices
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await serviceFunctions.deleteServices(req);
        return res.status(200).json({
            success: true,
            msg: "Service is Deleted!"
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

//Sub services;

const addSubService = async (req, res) => {
    try {
        const subService = await serviceFunctions.addSubService(req);
        return res.status(200).json({
            success: true,
            msg: "Subservice Added Successfully!",
            data: subService
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const updatedSubService = async (req, res) => {
    try {
        const updated = await serviceFunctions.updatedSubService(req);
        return res.status(200).json({
            sucess: true,
            msg: "SubService Updated Successfully!",
            data: updated
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        }) 
    }
}

// const getAllsubServicesByServiceId = async (req, res) => {
//     try {
//         const allSubServices = await serviceFunctions.getAllsubServicesByServiceId(req);
//         return res.status(200).json({
//             success: true,
//             msg: "All Subservices By Service Id",
//             data: allSubServices
//         })
//     } catch (error) {
//         console.log("Having Errors: ", error);
//         return res.status(403).json({
//             success: false,
//             msg: "Having Errors",
//             error: error.message
//         })
//     }
// };

const getAllSubServicesByAdminId = async (req, res) => {
    try {
        const allServices = await serviceFunctions.getAllSubServicesByAdminId(req);
        return res.status(200).json({
            sucess: true,
            msg: "All Subservices By Admin Id!",
            data: allServices
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getSubService = async (req, res) => {
    try {
        const subService = await serviceFunctions.getSubServiceById(req);
        return res.status(200).json({
            sucess: true,
            msg: "Subservice By Id",
            data: subService
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getAllSubServices = async (req, res) => {
    try {
        const allServices = await serviceFunctions.getAllSubServices(req);
        if(allServices.length === 0){
            return res.status(200).json({
                sucess: true,
                msg: "No Services Found By Admin Id!",
            })
        } else {
            return res.status(200).json({
                sucess: true,
                msg: "All Subservices By Admin Id!",
                data: allServices
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const assignEmployee = async (req, res) => {
    try {
        const assign = await serviceFunctions.assignEmployeeToService(req);
        return res.status(200).json({
            success: true,
            msg: "Employee Successfully Assigned!",
            data: assign
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const deleteSubService = async (req, res) => {
    try {
        const subService = await serviceFunctions.deleteSubService(req);
        return res.status(200).json({
            success: true,
            msg: "SubService is Deleted"
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

// const getAllSubServicesForUser = async (req, res) => {
//     try {
//         const Subservices = await serviceFunctions.getAllSubServicesByAdminIdForUser(req);
//         return res.status(200).json({
//             success: true,
//             msg: "All Subservices By Admin Id",
//             data: Subservices
//         })
//     } catch (error) {
//         console.log("Having Errors: ", error);
//         return res.status(403).json({
//             success: false,
//             msg: "Having Errors",
//             error: error.message
//         })
//     }
// };

module.exports = {
    addService,
    getAllservicesByAdminId,
    getAllservices,
    deleteService,
    addSubService,
    updatedSubService,
    // getAllsubServicesByServiceId,
    getAllSubServicesByAdminId,
    getSubService,
    getAllSubServices,
    assignEmployee,
    deleteSubService,
    // getAllSubServicesForUser,
};