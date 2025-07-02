const mongoose = require("mongoose");
const royalityModel = require("../models/royalityPoints");
const businessModel = require("../models/businessProfile");
const subServiceModel = require("../models/subServices");
const appointmentModel = require("../models/appointmentModel");
const clientProfileModel = require("../models/clientProfile");

const createRoyality = async (update) => {
  // console.log("object :", update.services[0].servicePoints);
  const { adminId, userId } = update;
  const businessProfile = await businessModel.findOne({ adminId: adminId });
  // return
  const points = businessProfile.royalityPoints;
  console.log("royalPoints :", points);

  // if The Business Profile Royal points are set as 0 or null, This will get the Royality Points from SubServices Royality Points
  if (
    businessProfile.royalityPoints === null ||
    businessProfile.royalityPoints === 0
  ) {
    const subservices = update.services.map((service) => ({
      subServices: service._id, // Reference to Subservice
      points: service.servicePoints ?? 0, // Optional: default to 0
    }));

    const totalPoints = subservices.reduce((acc, item) => acc + item.points, 0);

    const exists = await royalityModel.findOne({
      userId: userId,
      adminId: adminId,
    });
    if (exists) {
      // If the User's Royality Profile Exists this will update the Existing Profile
      const royalityId = exists._id;
      const existingPoints = exists.royality.reduce(
        (acc, item) => acc + (item.points ?? 0),
        0
      );
      const updatedTotalPoints = existingPoints + totalPoints;
      const royality = await royalityModel.findByIdAndUpdate(
        { _id: royalityId },
        {
          $push: { royality: { $each: subservices } },
          $set: { totalPoints: updatedTotalPoints },
        },
        { new: true }
      );
      console.log(
        "User's Royality Profile Updated by SubService Royality Points"
      );
      return royality;
    } else {
      // If the User's Royality Profile dose not Exists this will create the User's Royality Profile
      const newRoyality = new royalityModel({
        userId,
        adminId,
        royality: subservices,
        totalPoints,
      });
      const result = await newRoyality.save();
      console.log(
        "User's Royality Profile Created by SubService Royality Points"
      );
      return result;
    }
  } else {
    // if the Business Profile Royality Points Exists it will apply the existing Points to each Subservice
    const exists = await royalityModel.findOne({
      userId: userId,
      adminId: adminId,
    });
    if (exists) {
      // If the User's Royality Profile Exists this will update the Existing Profile
      const subservices = update.services.map((service) => ({
        subServices: service._id,
        points: points ?? 0,
      }));
      const royalityId = exists._id;
      const existingPoints = exists.royality.reduce(
        (acc, item) => acc + (item.points ?? 0),
        0
      );
      const updatedTotalPoints =
        existingPoints +
        subservices.reduce((acc, item) => acc + item.points, 0);
      const result = await royalityModel.findByIdAndUpdate(
        { _id: royalityId },
        {
          $push: { royality: { $each: subservices } },
          $set: { totalPoints: updatedTotalPoints },
        },
        { new: true }
      );
      console.log(
        "User's Royality Profile Updated by Business Royality Points"
      );
      return result;
    } else {
      // If the User's Royality Profile dose not Exists this will create the User's Royality Profile
      const subservices = update.services.map((service) => ({
        subServices: service._id, // Reference to Subservice
        points: points ?? 0, // Optional: default to 0
      }));
      const totalPoints = subservices.reduce(
        (sum, item) => sum + item.points,
        0
      );
      const newRoyality = new royalityModel({
        userId,
        adminId,
        royality: subservices,
        totalPoints,
      });
      const result = await newRoyality.save();
      console.log(
        "User's Royality Profile Created by Business Royality Points"
      );
      return result;
    }
  }
};

const getAllProfilesByUser = async (req) => {
  const { userId } = req.query;
  const result = await royalityModel.find({ userId: userId });
  return result;
};

const getTotalPointsByUser = async (req) => {
  const { userId } = req.query;
  const points = await royalityModel.find({ userId: userId });
  const total = points.reduce((sum, item) => sum + (item.totalPoints || 0), 0);
  return total;
};

const getAllProfilesByAdmin = async (req) => {
  const { adminId } = req.query;
  const profiles = await royalityModel.find({ adminId: adminId });
  return profiles;
};

const getTotalPointsByAdmin = async (req) => {
  const { adminId } = req.query;
  const points = await royalityModel.find({ adminId: adminId });
  const total = points.reduce((sum, item) => sum + (item.totalPoints || 0), 0);
  return total;
};

const businessRoyalityPoints = async (req) => {
  const { adminId, points } = req.query;
  console.log("Request :", req.query);
  const updateBusiness = await businessModel.findOneAndUpdate(
    { adminId: adminId },
    { $set: { royalityPoints: points } },
    { new: true }
  );

  // return
  const subservice = await subServiceModel.updateMany(
    { adminId: adminId },
    { $set: { servicePoints: null } }
  );

  console.log("object :", subservice);
  return updateBusiness;
};

const updatedSubServiceRoyalityPoints = async (req) => {
  const { subserviceId, points } = req.query;
  const updateSubservice = await subServiceModel.findByIdAndUpdate(
    { _id: subserviceId },
    { $set: { servicePoints: points } },
    { new: true }
  );

  console.log("adminId:", updateSubservice.adminId);
  const adminId = updateSubservice.adminId;

  const business = await businessModel.findOneAndUpdate(
    { adminId: adminId },
    { $set: { royalityPoints: null } },
    { new: true }
  );

  console.log("business :", business);
  return updateSubservice;
};

const dashBoardRoyality = async (req) => {
  const { adminId } = req.query;

  const loyalityCustomers = await royalityModel
    .find({ adminId: adminId })
    .countDocuments();
  const totalCustomers = await clientProfileModel
    .find({ adminId: adminId })
    .countDocuments();
  const totalAppointments = await appointmentModel
    .find({ adminId: adminId })
    .countDocuments();
  const appointmentCompleted = await appointmentModel
    .find({ adminId: adminId, status: "Completed" })
    .countDocuments();
  const recuringCustomers = await appointmentModel.aggregate([
    {
      $match: {
        adminId: new mongoose.Types.ObjectId(adminId),
        userId: { $ne: null }, // ensure userId exists
      },
    },
    {
      $group: {
        _id: "$userId",
        count: { $sum: 1 },
        appointments: { $push: "$$ROOT" },
      },
    },
    {
      $match: {
        count: { $gt: 1 }, // only recurring users
      },
    },
  ]);

  const uniqueCustomers = await appointmentModel.aggregate([
    {
      $match: {
        adminId: new mongoose.Types.ObjectId(adminId),
        userId: { $ne: null }, // ensure userId exists
      },
    },
    {
      $group: {
        _id: "$userId",
        count: { $sum: 1 },
        appointments: { $push: "$$ROOT" },
      },
    },
    {
      $match: {
        count: { $lte: 1 }, // only recurring users
      },
    },
  ]);

  console.log("Loyal Customers :", loyalityCustomers);
  console.log("Total Customers :", totalCustomers);
  console.log("Total Appoints :", totalAppointments);
  console.log("appointments Completed :", appointmentCompleted);
  console.log("Recurring Customers :", recuringCustomers.length);
  console.log("Unique Customers :", uniqueCustomers.length);

  const dashboardData = {
    loyalCustomer: loyalityCustomers,
    totalCustomers: totalCustomers,
    totalAppointments: totalAppointments,
    appointmentCompleted: appointmentCompleted,
    recuringCustomers: recuringCustomers.length,
    uniqueCustomers: uniqueCustomers.length,
  };

  return dashboardData;
};

const totalServicesPoints = async (req) => {
  const { adminId } = req.query;

  const result = [];
  const subServices = await subServiceModel.find({ adminId: adminId });

  for (const sub of subServices) {
    const appointments = await appointmentModel.find({
      adminId,
      services: sub._id, // Check if this subservice is in the services array
    });

    result.push({
      subServiceId: sub._id,
      subServiceName: sub.title,
      appointments: appointments.length
    });
  };
  return result
};

const pauseRoyalityPoints = async (req) => {
  const { adminId } = req.query;
  const updateSubservice = await subServiceModel.updateMany(
    { adminId: adminId },
    { $set: { servicePoints: null } },
    { new: true }
  );

  const business = await businessModel.findOneAndUpdate(
    { adminId: adminId },
    { $set: { royalityPoints: null } },
    { new: true }
  );

  console.log("business :", business);
  return updateSubservice;
};


module.exports = {
  createRoyality,
  getAllProfilesByUser,
  getTotalPointsByUser,
  getAllProfilesByAdmin,
  getTotalPointsByAdmin,
  businessRoyalityPoints,
  updatedSubServiceRoyalityPoints,
  dashBoardRoyality,
  totalServicesPoints,
  pauseRoyalityPoints
};
