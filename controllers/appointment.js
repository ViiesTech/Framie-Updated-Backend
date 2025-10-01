const appointmentFunction = require("../functions/appointment");
const clientProfileFunction = require("../functions/clientProfile");
const royalityFunction = require("../functions/royalityPoint");

const createAppointment = async (req, res) => {
    try {
        const available = await appointmentFunction.availableAppointment(req);
        console.log("Availability :", available);
        // return
        if(!available){
            const appointment = await appointmentFunction.createAppointment(req);
            if(appointment === null){
                return res.status(200).json({
                    success: false,
                    msg: "Appointment Not created!"
                })
            } else {
                const clientProfile = await clientProfileFunction.createClientProfile(req);
                return res.status(200).json({
                    success: true,
                    msg: "Appointment Created Successfully!",
                    data: appointment
                })
            }    
        } else {
            return res.status(200).json({
                success: false,
                msg: "Stylist is Not Availale At this Time!"
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const getAvailableStylist = async (req, res) => {
    try {
        const available = await appointmentFunction.availableStylist(req);
        if(available.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Stylist Available!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Available Stylists!",
                data: available
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
}  

const getAppointment = async (req, res) => {
    try {
        const appointment = await appointmentFunction.getAppointment(req);
        return res.status(200).json({
            success: true,
            msg: "Appointment Details!",
            data: appointment
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const getAppointmentbyUser = async (req, res) => {
    try {
        const appointments = await appointmentFunction.getAppointmentbyUser(req);
        return res.status(200).json({
            success: true,
            msg: "Appointments By User!",
            data: appointments
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentFunction.getAllAppointments(req);
        if(appointments.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Appointments Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Appointments by Stylist!",
                data: appointments
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await appointmentFunction.getTotalClients(req);
        const income = await appointmentFunction.totalIncome(req);
        return res.status(200).json({
            sucess: true,
            msg: "Done",
            data: {
                totalCustomers: customers,
                totalIncome: income
            }
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentFunction.deleteAppointment(req);
        return res.status(200).json({
            success: true,
            msg: "Appointment is Deleted!"
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const getTotalCustomers = async (req, res) => {
    try {
        const total = await appointmentFunction.getTotalCustomers(req);
        return res.status(200).json({
            success: true,
            msg: "Total Customers By admin ID!",
            data: total
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        })
    }
};

const updateAppointment = async (req, res) => {
    try {
        const appointment = await appointmentFunction.updateAppointment(req);
        return res.status(200).json({
            success: true,
            msg: "Appointment Details updated!",
            data: appointment
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(200).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getRevenue = async (req, res) => {
    try {
        const revenue = await appointmentFunction.getyearlyRevenue(req);
        return res.status(200).json({
            success: true,
            msg: "Yearly Revenue!",
            data: revenue
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(200).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getAlreadyBookedAppointments = async (req, res) => {
    try {
        const booked = await appointmentFunction.alreadyBooked(req);
        if(booked.length === 0){
            return res.status(200).json({
                success: true,
                msg: "All Slots Available!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Already Booked Slots!",
                data: booked 
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(200).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })        
    }
}

module.exports = { 
    createAppointment,
    getAppointment,
    getAppointmentbyUser,
    getAllAppointments,
    getAvailableStylist,
    getAlreadyBookedAppointments,
    getCustomers,
    deleteAppointment,
    getTotalCustomers,
    updateAppointment,
    getRevenue
};