const employeeFunction = require("../functions/employee");

const addEmployee = async (req, res) => {
    try {
        const employee = await employeeFunction.addEmployee(req);
        return res.status(200).json({
            success: true,
            msg: "Employee Added Successfully!",
            data: employee
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

const getAllEmployeesByAdmin = async (req, res) => {
    try {
        const allEmployees = await employeeFunction.getAllEmployeesByAdmin(req);
        return res.status(200).json({
            success: true,
            msg: "All Employees By AdminId",
            data: allEmployees
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

const getEmployee = async (req, res) => {
    try {
        const employee = await employeeFunction.getEmployee(req);
        return res.status(200).json({
            sucess: true,
            msg: "Employee Profile!",
            data: employee
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

const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await employeeFunction.updateEmployee(req);
        return res.status(200).json({
            success: true,
            msg: "Employee Profile Updated Successfylly!",
            data: updatedEmployee
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

const deleteEmployee = async (req, res) => {
    try {
        const employee = await employeeFunction.deleteEmployee(req);
        return res.status(200).json({
            success: true,
            msg: "Employee is Deleted!"
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

module.exports = { 
    addEmployee,
    getAllEmployeesByAdmin,
    getEmployee,
    updateEmployee,
    deleteEmployee
};