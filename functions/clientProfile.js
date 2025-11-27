const clientProfileModel = require("../models/clientProfile");
const appointmentModel = require("../models/appointmentModel");

const createClientProfile = async (req) => {
    const { userId, adminId } = req.body;
    const appointment = await appointmentModel.find({userId, userId, adminId: adminId},{_id: 1});
    const previousAppointments = appointment.map(app => app._id);
    const clientProfile = await clientProfileModel.findOne({userId: userId, adminId: adminId});
    if(clientProfile === null){
        const newClientProfile = new clientProfileModel({
            adminId: adminId,
            userId: userId,
            previousAppointments: previousAppointments
        });
        const result = await newClientProfile.save();
        console.log("Client Profile Successfully Created!");
        return result
    } else {
        const result = await clientProfileModel.findOneAndUpdate({userId: userId, adminId: adminId},
            { $set: {previousAppointments: previousAppointments}},
            { new: true }
        );
        console.log("Client Profile Already Created!");
        return result
    }
};

const getClientProfile = async (req) => {
    const { userId, adminId } = req.query;
    const result = await clientProfileModel.findOne({userId: userId, adminId: adminId}).populate({
        path: "userId",
        select: "-password"
    }).populate({
        path: "previousAppointments",
        options: { sort: { date: -1 } } ,
        populate: [{
            path: "services",
            model: "Subservice"
        },
        {
            path: "stylist",
            model: "Stylist",
            select: "stylistName stylistImage about"
        }]
    }).populate("stylists");

    if (result?.previousAppointments?.length) {
        result.previousAppointments.sort((a, b) => {
            const order = { "Accepted": 0, "Completed": 1 };
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

const addStylist = async (req, res) => {
    const { userId, stylistId } = req.query;
    const result = await clientProfileModel.findOneAndUpdate({userId: userId},
        {$push: { stylists: stylistId}},
        { new: true }
    );
    return result;
};

const getAllClients = async (req) => {
    const { adminId } = req.query;
    const result = await clientProfileModel.find({adminId: adminId}).populate({
        path: "userId",
        select: "-password"
    }).populate({
        path: "previousAppointments",
        options: { sort: { date: -1 } } ,
        populate: [{
            path: "services",
            model: "Subservice"
        },
        {
            path: "stylist",
            model: "Stylist",
            select: "stylistName stylistImage about"
        }]
    });
    return result
};

module.exports= {
    createClientProfile,
    getClientProfile,
    updateNotes,
    addStylist,
    getAllClients
};