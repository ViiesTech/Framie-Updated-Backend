const walkinFunction = require("../functions/walkinCustomer");

const createWalkin = async (req, res) => {
    try {
        const walkin = await walkinFunction.createWalkinAppointment(req);
        return res.status(200).json({
            success: true,
            msg: "Walk-In Appointment Created!",
            data: walkin
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        });
    }
};

const getWalkinById = async (req, res) => {
    try {
        const walkin = await walkinFunction.getWalkinAppointmentbyId(req);
        if(!walkin){
            return res.status(200).json({
                success: false,
                msg: "No Walk-In Appointment Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Walk-In Appointment Details!",
                data: walkin 
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        });
    }    
};

const getAllwalkins = async (req, res) => {
    try {
        const walkins = await walkinFunction.getAllWalkinAppointments(req);
        if(walkins.length === 0){
            return res.status(200).json({
                success: false,
                msg: "No Walk-Ins Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Walk-Ins!",
                data: walkins 
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        });
    }    
};

const updatewalkinById = async (req, res) => {
    try {
        const walkin = await walkinFunction.updateWalkinAppointments(req);
        if(!walkin){
            return res.status(200).json({
                success: false,
                msg: "No Walk-In found to Update!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Walk-In Details Updated!",
                data: walkin
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        });
    }    
};

const deleteWalkinById = async (req, res) => {
    try {
        const walkin = await walkinFunction.deleteWalkinAppointments(req);
        if(!walkin){
            return res.status(200).json({
                success: false,
                msg: "No Walk-In found to Delete!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Walk-In is Deleted!"
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        });
    }
};

module.exports = {
    createWalkin,
    getWalkinById,
    getAllwalkins,
    updatewalkinById,
    deleteWalkinById
};