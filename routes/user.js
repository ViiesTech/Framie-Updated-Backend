const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user");
const appointmentController = require("../controllers/appointment");
const royalityController = require("../controllers/royalityPoint");
const favoriteController = require("../controllers/favorite");
const businessProfileController = require("../controllers/businessProfile");
const serviceController = require("../controllers/service");

// User Auth Routes
router.post("/user/signup", userController.signUp);
router.post("/user/signUpwithGoogle", userController.signInByGoogle);
router.post("/user/login", userController.login);
router.post("/user/verifyOTP", userController.verifyOTP);
router.get("/user/getProfile", auth.verifyUser, userController.getProfile);
router.post("/user/updateProfie", auth.verifyUser, auth.uploadUser.single("Image"), userController.updateUser);
router.post("/user/OTP", userController.generateOTP);

// User Royality Points Routes
router.get("/user/getRoyalityProfiles", royalityController.getAllRoyalityProfileByUser);
router.get("/user/totalRoyalityPoints", royalityController.getTotalRoyalityPointsByUser);

// User Favorite Routes
router.post("/user/addToFavorite", favoriteController.addToFavorite);
router.get("/user/allFavoritesByUser", favoriteController.getAllfavroites);

// Business Profiles || Salons
router.get("/user/getBusinessProfile", businessProfileController.getBusinessProfile);
router.get("/user/allBusinessProfiles", auth.verifyUser, businessProfileController.getAllBusinessProfiles);
router.get("/user/getNearByBusinessProfiles", businessProfileController.nearByBusinessProfiles);

// Service Routes
router.get("/user/getAllServices", serviceController.getAllservices);

// Subservice Routes
router.get("/user/getAllSubServices", serviceController.getAllSubServices);
router.get("/user/getSubserviceById", serviceController.getSubService);

// Appointments By User
router.get("/user/availableStylists", appointmentController.getAvailableStylist);
router.get("/user/alreadyBookedAppointments", appointmentController.getAlreadyBookedAppointments)
router.post("/user/addAppointment", appointmentController.createAppointment);
router.post("/user/updateAppointment", appointmentController.updateAppointment);
router.get("/user/getAppointmentsByUser", appointmentController.getAppointmentbyUser);
router.post("/user/deleteAppointment", appointmentController.deleteAppointment);

module.exports = router;