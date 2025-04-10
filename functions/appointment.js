const appointmointModel = require("../models/appointmentModel");

const createAppointment = async (req) => {
  if(req.body.createdByModel === "Admin"){
    const newAppointment = new appointmointModel(req.body);
    const result = await newAppointment.save();
    return result;
  } else {
    const newAppointment = new appointmointModel(req.body);
    const result = await newAppointment.save();
    return result;
  } 
};

const getAppointment = async (req) => {
    const appointmentId = req.query.appointmentId;
    const appointment = await appointmointModel.findById({_id: appointmentId});
    return appointment;
};

const updateStatus = async (req) => {
    const { appointmentId, status} = req.body;

    const appointment = await appointmointModel.findByIdAndUpdate({
        _id: appointmentId},
        {$set: {status: status}},
        { new: true});
    return appointment; 
};

const getAppointmentbyUser = async (req) => {
    const userId = req.query.userId;
    const appointment = await appointmointModel.find({userId: userId});
    return appointment
};

const getAppointmentbyAdmin = async (req) => {
    const {adminId, status} = req.query;
    console.log("object :", adminId);
    if(status === "All" || status === "all"){
      const appointment = await appointmointModel.find({
        adminId: adminId
      });
      return appointment;
    } else {
      const appointment = await appointmointModel.find({
        adminId: adminId,
        status: status
      });
      return appointment;
    }
    
};

const getAppointmentsByStylists = async (req) => {
  const { adminId, employeeId } = req.query;
  if(!employeeId){
    const appointments = await appointmointModel.find({
      adminId: adminId
    });
    console.log("first :")
    return appointments
  } else {
    const appointments = await appointmointModel.find({
      adminId: adminId,
      stylist: employeeId
    });
    console.log("Second :")
    return appointments
  }
};

const getTotalClients = async (req) => {
  const { adminId } = req.query;
  const appointment = await appointmointModel.find({adminId: adminId}).countDocuments();
  // console.log("first", appointment);
  return appointment
};

const totalIncome = async (req) => {
  const { adminId } = req.query;
  const income = await appointmointModel.find({
    adminId: adminId,
    status: "Completed"
  });

  const totalIncome = income.reduce((sum, appointment) => sum + (appointment.price || 0), 0);
  return totalIncome;
};

const deleteAppointment = async (req) => {
    const { appointmentId } = req.query;
    const result = await appointmointModel.findByIdAndDelete({_id: appointmentId});
    return result 
};

module.exports = { 
    createAppointment,
    getAppointment,
    updateStatus,
    getAppointmentbyUser,
    getAppointmentbyAdmin,
    getAppointmentsByStylists,
    getTotalClients,
    totalIncome,
    deleteAppointment
};