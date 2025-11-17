const walkinModel = require("../models/walkinCustomer");

const createWalkinAppointment = async (req) => {
    const newAppointment = new walkinModel(req.body);
    const result = await newAppointment.save();
    return result
};

const getWalkinAppointmentbyId = async (req) => {
    const { walkinAppointmentId } = req.query;
    const walkinAppointment = await walkinModel.findById(walkinAppointmentId);
    return walkinAppointment; 
};

const getAllWalkinAppointments = async (req) => {
    const { phone, date, subServiceId, stylistId, timeSlot ,adminId } = req.query;
    const filter = {};

    if(phone) filter.phone = phone;
    if(date) filter.date = date;
    if(subServiceId) filter.subService = subServiceId;
    if(stylistId) filter.stylist = stylistId;;
    if(adminId) filter.adminId = adminId
    if(timeSlot) filter.timeSlot = timeSlot;

    const walkinAppointments = await walkinModel.find(filter).populate("stylist subService");
    return walkinAppointments;
};

const updateWalkinAppointments = async (req) => {
    const { walkinAppointmentId } = req.body;
    const updatedData = req.body;

    const walkinAppointment = await walkinModel.findByIdAndUpdate(walkinAppointmentId, 
        { $set: updatedData },
        { new: true }
    );

    return walkinAppointment
};

const deleteWalkinAppointments = async (req) => {
    const { walkinAppointmentId } = req.query;
    const walkinAppointment = await walkinModel.findByIdAndDelete(walkinAppointmentId);
    return walkinAppointment
};

module.exports = {
    createWalkinAppointment,
    getWalkinAppointmentbyId,
    getAllWalkinAppointments,
    updateWalkinAppointments,
    deleteWalkinAppointments
};