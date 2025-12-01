const express = require('express');
const router = express.Router(); 

const auth = require("../middleware/auth");
const adminController = require("../controllers/admin");
const businessProfileController = require("../controllers/businessProfile");
const serviceController = require("../controllers/service");
const stylistController = require("../controllers/stylist");
const appointmentController = require("../controllers/appointment");
const royalityController = require("../controllers/royalityPoint");
const walkinController = require("../controllers/walkinCustomer");

// Auth Routes
router.post("/admin/signup", auth.UploadAdmin.single("AdminImage"), adminController.signup);
router.post("/admin/verifyOTP", adminController.verifyOTP);
router.post("/admin/login", adminController.login);
router.post("/admin/updateAdmin",  auth.UploadAdmin.single("AdminImage"), adminController.updateProfile);
router.get("/admin/adminByadminId", adminController.adminProfile);
// auth.verifyAdmin,

// Billing Details Routes
router.post("/admin/addBilling", adminController.addBillingDetails);
router.get("/admin/getBilling", auth.verifyAdmin, adminController.getBillingDetails);
router.post("/admin/updateBilling", auth.verifyAdmin, adminController.updatedBillingDetails);

// Business Profile Routes
router.post("/admin/addBusinessProfile", auth.verifyAdmin, auth.UploadBusiness.single("BusinessImage"), businessProfileController.addBusinessProfile);
router.get("/admin/getBusinessProfile", auth.verifyAdmin, businessProfileController.getBusinessProfile);
router.post("/admin/updateBusinessProfile", auth.verifyAdmin, auth.UploadBusiness.single("BusinessImage"), businessProfileController.updateBusinessProfile);
router.get("/admin/allBusinessProfiles", auth.verifyUser, businessProfileController.getAllBusinessProfiles);
router.get("/user/getNearByBusinessProfiles", businessProfileController.nearByBusinessProfiles);

// Services Routes
router.post("/admin/addService", auth.verifyAdmin, auth.UploadService.single("ServiceImage"),serviceController.addService);
router.get("/admin/getAllServicesByAdminId", auth.verifyAdmin, serviceController.getAllservicesByAdminId);
router.get("/admin/getAllServices", serviceController.getAllservices);
router.post("/admin/deleteService", serviceController.deleteService);

// Subservices Routes
router.post("/admin/addSubService", auth.UploadSubService.array("subServiceImages", 3), serviceController.addSubService);
router.post("/admin/EditSubService",auth.UploadSubService.array("subServiceImages", 3), serviceController.updatedSubService);
router.get("/admin/getSubServicesByAdminId", auth.verifyAdmin, serviceController.getAllSubServicesByAdminId);
router.get("/admin/getAllSubServices", serviceController.getAllSubServices);
router.get("/admin/getSubserviceById", serviceController.getSubService);
router.post("/admin/deleteSubservice", serviceController.deleteSubService);
// router.post("/admin/assignStylist", serviceController.assignStylist);

// Stylist Routes
router.post("/admin/addStylist", auth.UploadEmployee.single("stylistImage"), stylistController.addStylist);
router.post("/admin/stylistLogin", stylistController.login);
router.get("/admin/getAllStylists", stylistController.getAllStylistsByAdmin);
router.get("/user/getAllStylists", stylistController.getAllStylistsByAdmin);
router.get("/admin/getStylistProfile", stylistController.getStylistProfile);
router.post("/admin/updateStylist", auth.UploadEmployee.single("stylistImage"), stylistController.updateStylist);
router.post("/admin/addSubservicesToStylist", stylistController.addSubservicesToStylist);
router.post("/admin/deleteStylist", stylistController.deleteStylist);
router.get('/admin/getDashboardStats/:stylistId' , stylistController.getDashboardStats)

//Appointment Routes for Admin
router.post("/admin/addAppointment", appointmentController.createAppointment);
router.get("/admin/getAppointment", appointmentController.getAppointment);
router.get("/admin/getAllAppointments",appointmentController.getAllAppointments);
router.post("/admin/updateAppointment", appointmentController.updateAppointment);
router.get("/admin/getCustomers", appointmentController.getCustomers);
router.get("/admin/getTotalCustomers", appointmentController.getTotalCustomers);

// Revenue By AdminId//
router.get("/admin/yearlyRevenue", appointmentController.getRevenue);

// Walk-In Customer's Route 
router.post("/admin/createWalkin", walkinController.createWalkin);
router.get("/admin/getAllWalkins", walkinController.getAllwalkins);
router.get("/admin/getWalkinById", walkinController.getWalkinById);
router.post("/admin/updateWalkin", walkinController.updatewalkinById);
router.post("/admin/deleteWalkin", walkinController.deleteWalkinById);

module.exports = router