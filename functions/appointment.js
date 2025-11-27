const appointmentModel = require("../models/appointmentModel");
const subServiceModel = require("../models/subServices");
const mongoose = require("mongoose");
const moment = require("moment");
const stylistModel = require("../models/stylist");

const createAppointment = async (req) => {
  if(req.body.createdByModel === "Admin"){
    const newAppointment = new appointmentModel(req.body);
    const result = await newAppointment.save();
    return result;
  } else {
    const newAppointment = new appointmentModel(req.body);
    const result = await newAppointment.save();
    return result;
  } 
};

const getAppointment = async (req) => {
    const appointmentId = req.query.appointmentId;
    const appointment = await appointmentModel.findById({_id: appointmentId});
    return appointment;
};

const getAppointmentbyUser = async (req) => {
    const userId = req.query.userId;
    const appointment = await appointmentModel.find({userId: userId});
    return appointment
};

const getAllAppointments = async (req) => {
  const { adminId, stylistId, status } = req.query;

  const filter = {};
  if(adminId){
    filter.adminId = adminId
  };
  if(stylistId){
    filter.stylist = stylistId
  };
  if(status){
    filter.status = status
  };

  const appointments = await appointmentModel.find(filter).populate({
    path: "services",
    select: "title text subServiceImage proce"
  }).populate("stylist", "-password");
  return appointments;
};

const availableStylist = async (req) => {
  const { serviceId, date, timeSlot } = req.query;

  const service = await subServiceModel.findById({_id: serviceId});

  const appointments = await appointmentModel.distinct("stylist", {
    services: new mongoose.Types.ObjectId(serviceId),
    date,
    timeSlot: {$regex: `^${timeSlot}$`, $options: "i"},
    status: { $in: ["Accepted", "Rescheduled"] }
  });
  const availableStylistIds = service.assignedTo.filter(
  stylistId => !appointments.map(String).includes(String(stylistId))
  );

  const availableStylists = await stylistModel.find({
      _id: { $in: availableStylistIds }
    }).select("email stylistName about stylistImage");

  return availableStylists

};

const alreadyBooked = async (req) => {
  const { adminId, stylistId, date, timeSlot } = req.query;
   const filter = { 
    status: { $in: ["Accepted", "Rescheduled"] }
   };
  if(stylistId){
    filter.stylist = stylistId
  };

  if(adminId){
    filter.adminId = adminId
  };

  if(date){
    filter.date = date
  };

  if(timeSlot){
    filter.timeSlot = { $regex: timeSlot, $options: "i" }
  };
  
  const appointment = await appointmentModel.find(filter);
  return appointment
};

const availableAppointment = async (req) => {
  const { stylistId, date, timeSlot } = req.body;
   const filter = { 
    status: { $in: ["Accepted", "Rescheduled"] }
   };
  if(stylistId){
    filter.stylist = stylistId
  };

  if(date){
    filter.date = date
  };

  if(timeSlot){
    filter.timeSlot = { $regex: timeSlot, $options: "i" }
  };
    const appointment = await appointmentModel.findOne(filter);
  return appointment
};

const updateAppointment = async (req) => {
  const { appointmentId } = req.body;
  const updatedData = req.body;
  const update = await appointmentModel.findByIdAndUpdate({_id: appointmentId},
    { $set: updatedData},
    { new: true }
  );
  return update
};

const deleteAppointment = async (req) => {
    const { appointmentId } = req.query;
    const result = await appointmentModel.findByIdAndDelete({_id: appointmentId});
    return result 
};

const getTotalClients = async (req) => {
  const { adminId } = req.query;
  const appointment = await appointmentModel.find({adminId: adminId}).countDocuments();
  return appointment
};

const totalIncome = async (req) => {
  const { adminId } = req.query;
  const income = await appointmentModel.find({
    adminId: adminId,
    status: "Completed"
  });

  const totalIncome = income.reduce((sum, appointment) => sum + (appointment.price || 0), 0);
  return totalIncome;
};

const getTotalCustomers = async (req) => {
  const { adminId, type } = req.query;
  
  const today = moment();
  const filter = { adminId };

  if(type === "day"){
    const todaystr = today.format("D-M-YYYY");
    filter.date = todaystr; 
  } else if( type === "week"){
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
    weekDates.push(today.clone().subtract(i, 'days').format('D-M-YYYY'));
    }
    console.log("object", weekDates);
    filter.date = { $in: weekDates };
    // return
  } else if( type === "month"){
    const month = today.month() + 1;
    const year = today.year();
    filter.date = { $regex: new RegExp(`^\\d{1,2}-(0?${month})-${year}$`)};
  }

  const total = await appointmentModel.find(filter).countDocuments();
  return total;

};

const getyearlyRevenue = async (req, res) => {
  const { adminId } = req.query;

  const monthlyRevenue = await appointmentModel.aggregate([
    {
      $match: {
        adminId: new mongoose.Types.ObjectId(adminId)
      }
    },
    {
      $project: {
        price: 1,
        month: {
          $month: {
            $dateFromString: {
              dateString: "$date",
              format: "%d-%m-%Y"
            }
          }
        },
        year: {
          $year: {
            $dateFromString: {
              dateString: "$date",
              format: "%d-%m-%Y"
            }
          }
        }
      }
    },
    // First group: monthly totals
    {
      $group: {
        _id: { year: "$year", month: "$month" },
        totalRevenue: { $sum: "$price" },
        appointmentsCount: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1
      }
    },
    {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        totalRevenue: 1,
        appointmentsCount: 1,
        _id: 0
      }
    }
  ]);

  // Second aggregation for yearly totals
  const yearlyRevenue = await appointmentModel.aggregate([
    {
      $match: {
        adminId: new mongoose.Types.ObjectId(adminId)
      }
    },
    {
      $project: {
        price: 1,
        year: {
          $year: {
            $dateFromString: {
              dateString: "$date",
              format: "%d-%m-%Y"
            }
          }
        }
      }
    },
    {
      $group: {
        _id: "$year",
        yearlyRevenue: { $sum: "$price" },
        appointmentsCount: { $sum: 1 }
      }
    },
    {
      $sort: { _id: -1 }
    },
    {
      $project: {
        year: "$_id",
        yearlyRevenue: 1,
        appointmentsCount: 1,
        _id: 0
      }
    }
  ]);

  const data = {
    monthlyRevenue,
    yearlyRevenue
  };
  return data
};


module.exports = { 
    createAppointment,
    getAppointment,
    availableStylist,
    availableAppointment,
    getAppointmentbyUser,
    getAllAppointments,
    getTotalClients,
    totalIncome,
    deleteAppointment,
    getTotalCustomers,
    updateAppointment,
    getyearlyRevenue,
    alreadyBooked
};