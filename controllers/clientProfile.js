const clientProfileFunction = require("../functions/clientProfile");

const createClientProfile = async (req, res) => {
    try {
        const clientProfile = await clientProfileFunction.createClientProfile(req);
        return res.status(200).json({
            success: true,
            msg: "Client Profile Created!",
            data: clientProfile
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getClientProfile = async (req, res) => {
    try {
        const clientProfile = await clientProfileFunction.getClientProfile(req);
        return res.status(200).json({
            success: true,
            msg: "Client's Profile!",
            data: clientProfile
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const updateNotes = async (req, res) => {
    try {
        const notes = await clientProfileFunction.updateNotes(req);
        return res.status(200).json({
            sucess: true,
            msg: "Notes Are Updated Successfully!",
            data: notes
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const addEmployee = async (req, res) => {
    try {
        const updated = await clientProfileFunction.addEmployee(req);
        return res.status(200).json({
            success: true,
            msg: "Employee Added Successfully!",
            data: updated
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getAllClients = async (req, res) => {
    try {
        const clientProfiles = await clientProfileFunction.getAllClients(req);
        return res.status(200).json({
            success: true,
            msg: "All Client Profiles!",
            data: clientProfiles
        }) 
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }   
};

module.exports = { 
    createClientProfile,
    getClientProfile,
    updateNotes,
    addEmployee,
    getAllClients
};