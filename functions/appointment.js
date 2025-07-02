const appointmentModel = require("../models/appointmentModel");
const mongoose = require("mongoose");
const moment = require("moment");

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

const updateStatus = async (req) => {
    const { appointmentId, status} = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate({
        _id: appointmentId},
        {$set: {status: status}},
        { new: true}).populate({
          path: "services",
          select: "title servicePoints"
        });
    return appointment; 
};

const getAppointmentbyUser = async (req) => {
    const userId = req.query.userId;
    const appointment = await appointmentModel.find({userId: userId});
    return appointment
};

const getAppointmentbyAdmin = async (req) => {
    const {adminId, status} = req.query;
    console.log("object :", adminId);
    if(status === "All" || status === "all"){
      const appointment = await appointmentModel.find({
        adminId: adminId
      });
      return appointment;
    } else {
      const appointment = await appointmentModel.find({
        adminId: adminId,
        status: status
      });
      return appointment;
    }
    
};

const getAppointmentsByStylists = async (req) => {
  const { adminId, employeeId } = req.query;
  if(!employeeId){
    const appointments = await appointmentModel.find({
      adminId: adminId
    });
    console.log("first :")
    return appointments
  } else {
    const appointments = await appointmentModel.find({
      adminId: adminId,
      stylist: employeeId
    });
    console.log("Second :")
    return appointments
  }
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

const deleteAppointment = async (req) => {
    const { appointmentId } = req.query;
    const result = await appointmentModel.findByIdAndDelete({_id: appointmentId});
    return result 
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

const updateAppointment = async (req) => {
  const { appointmentId, stylistId } = req.body;

  const update = await appointmentModel.findByIdAndUpdate({_id: appointmentId},
    { $set: {stylist: stylistId}},
    { new: true }
  );
  return update
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
    updateStatus,
    getAppointmentbyUser,
    getAppointmentbyAdmin,
    getAppointmentsByStylists,
    getTotalClients,
    totalIncome,
    deleteAppointment,
    getTotalCustomers,
    updateAppointment,
    getyearlyRevenue
};