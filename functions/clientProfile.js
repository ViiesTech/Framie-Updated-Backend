const clientProfileModel = require("../models/clientProfile");
const appointmentModel = require("../models/appointmentModel");

const createClientProfile = async (req) => {
    const { userId, adminId } = req.body;
    const appointment = await appointmentModel.find({userId, userId},{_id: 1});
    const previousAppointments = appointment.map(app => app._id);
    const clientProfile = await clientProfileModel.findOne({userId: userId});
    if(clientProfile === null){
        const newClientProfile = new clientProfileModel({
            adminId: adminId,
            userId: userId,
            previousAppointments: previousAppointments
        });
        const result = await newClientProfile.save();
        console.log("first :");
        return result
    } else {
        const result = await clientProfileModel.findOneAndUpdate({userId: userId},
            { $set: {previousAppointments: previousAppointments}},
            { new: true }
        );
        console.log("Second :");
        return result
    }
};

const getClientProfile = async (req) => {
    const { userId } = req.query;
    const result = await clientProfileModel.findOne({userId: userId}).populate({
        path: "userId",
        select: "-password"
    }).populate({
        path: "previousAppointments",
        options: { sort: { date: -1 } } 
    }).populate("stylists");

    if (result?.previousAppointments?.length) {
        result.previousAppointments.sort((a, b) => {
            const order = { "Pending": 0, "Completed": 1 };
            return order[a.status] - order[b.status];
        });
    }
    return result;
};

const updateNotes = async (req) => {
    const { userId, notes } = req.body;
    const result = await clientProfileModel.findOneAndUpdate({userId: userId},
        { $push: { notes:{ $each: notes }}},
        { new: true}
    );
    return result;
};

const addEmployee = async (req, res) => {
    const { userId, employeeId } = req.query;
    const result = await clientProfileModel.findOneAndUpdate({userId: userId},
        {$push: { stylists: employeeId}},
        { new: true }
    );
    return result;
};

const getAllClients = async (req) => {
    const { adminId } = req.query;
    const result = await clientProfileModel.find({adminId: adminId}).populate({
        path: "userId",
        select: "-password"
    }).populate("previousAppointments");
    return result
};

module.exports= {
    createClientProfile,
    getClientProfile,
    updateNotes,
    addEmployee,
    getAllClients
};