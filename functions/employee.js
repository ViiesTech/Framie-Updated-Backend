const employeeModel = require("../models/employee");

const addEmployee = async (req) => {
    // console.log("data: ", req.body);
    const workingDays = JSON.parse(req.body.workingDays);
    const availableServices = JSON.parse(req.body.availableServices);
    const newEmployee = new employeeModel(req.body);
    newEmployee.employeeImage = req.file.filename;
    newEmployee.workinDays = workingDays;
    newEmployee.availableServices = availableServices;
    const result = await newEmployee.save(); 
    return result
};

const getAllEmployeesByAdmin = async (req) => {
    const adminId = req.query.adminId;
    const allEmployees = await employeeModel.find({createdBy: adminId}).populate({
        path: "availableServices",
        select: "serviceId",
        populate:{
            path: "serviceId",
            model: "Service",
            select: "Title"
        }
    });
    return allEmployees;
};

const getEmployee = async (req) => {
    const employeeId = req.query.employeeId; 
    const employee = await employeeModel.findById({_id: employeeId}).populate("availableServices");
    return employee
};

const updateEmployee = async (req) => {
    const createdBy = req.admin.id;
    console.log("object :", createdBy);
    const updatedData = req.body;
    updatedData.workinDays = JSON.parse(updatedData.workingDays); 
    const updatedEmployee = await employeeModel.findOneAndUpdate({createdBy: createdBy}, { $set: updatedData }, { new: true});
    return updatedEmployee
};

const deleteEmployee = async (req) => {
    const { employeeId } = req.query;
    const result = await employeeModel.findByIdAndDelete({_id: employeeId});
    return result
};

module.exports = { 
    addEmployee,
    getAllEmployeesByAdmin,
    getEmployee,
    updateEmployee,
    deleteEmployee
};
