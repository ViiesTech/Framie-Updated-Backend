const express = require('express');
const router = express.Router(); 

const auth = require("../middleware/auth");
const adminController = require("../controllers/admin");
const businessProfileController = require("../controllers/businessProfile");
const serviceController = require("../controllers/service");
const employeeController = require("../controllers/employee");
const appointmentController = require("../controllers/appointment");

// Auth Routes
router.post("/admin/signup", auth.UploadAdmin.single("AdminImage"), adminController.signup);
router.post("/admin/login", adminController.login);
router.post("/admin/updateAdmin",  auth.UploadAdmin.single("AdminImage"), adminController.updateProfile);
auth.verifyAdmin,
// Billing Details Routes
router.post("/admin/addBilling", adminController.addBillingDetails);
router.get("/admin/getBilling", auth.verifyAdmin, adminController.getBillingDetails);
router.post("/admin/updateBilling", auth.verifyAdmin, adminController.updatedBillingDetails);

// Business Profile Routes
router.post("/admin/addBusinessProfile", auth.verifyAdmin, auth.UploadBusiness.single("BusinessImage"), businessProfileController.addBusinessProfile);
router.get("/admin/getBusinessProfile", auth.verifyAdmin, businessProfileController.getBusinessProfile);
router.post("/admin/updateBusinessProfile", auth.verifyAdmin, auth.UploadBusiness.single("BusinessImage"), businessProfileController.updateBusinessProfile);
router.get("/admin/allBusinessProfiles", auth.verifyUser, businessProfileController.getAllBusinessProfiles);

// Services Routes
router.post("/admin/addService", auth.verifyAdmin, auth.UploadService.single("ServiceImage"),serviceController.addService);
router.get("/admin/getAllServices", auth.verifyAdmin, serviceController.getAllservicesByAdminId);
router.get("/admin/getAllServicesByAdminId", serviceController.getAllservicesByAdmin);
router.post("/admin/deleteService", serviceController.deleteService);

// Subservices Routes
router.post("/admin/addSubService", auth.UploadSubService.array("subServiceImages", 3), serviceController.addSubService);
router.post("/admin/EditSubService",auth.UploadSubService.array("subServiceImages", 3), serviceController.updatedSubService);
router.get("/admin/getSubServicesByServiceId", serviceController.getAllsubServicesByServiceId);
router.get("/admin/getSubServicesByAdminId", auth.verifyAdmin, serviceController.getAllSubServicesByAdminId);
router.get("/admin/getSubServicesByAdmin", serviceController.getAllSubServicesByAdmin);
router.get("/admin/getSubserviceById", serviceController.getSubService);
router.post("/admin/deleteSubservice", serviceController.deleteSubService);
// router.post("/admin/assignEmployee", serviceController.assignEmployee);

// User SubServices Route
router.get("/user/getSubServicesByAdminId", serviceController.getAllSubServicesForUser);

// Employee Routes
router.post("/admin/addEmployee", auth.UploadEmployee.single("EmployeeImage"), employeeController.addEmployee);
router.get("/admin/getAllEmployees", employeeController.getAllEmployeesByAdmin);
router.get("/admin/getEmployee", employeeController.getEmployee);
router.post("/admin/updateEmployee", auth.verifyAdmin, auth.UploadEmployee.single("EmployeeImage"), employeeController.updateEmployee);
router.post("/admin/deleteEmployee", employeeController.deleteEmployee);

//Appointment Routes for Admin
router.post("/admin/addAppointment", appointmentController.createAppointment);
router.get("/admin/getAppointmentByAdmin", appointmentController.getAppointmentbyAdmin);
router.get("/admin/getAppointment", appointmentController.getAppointment);
router.post("/admin/updateAppointment", appointmentController.updateStatus);
router.get("/admin/getCustomers", appointmentController.getCustomers);
router.get("/admin/appointmentByStylist",appointmentController.getAppointmentByStylists);

// Appointments By User
router.get("/user/getAppointmentsByUser", appointmentController.getAppointmentbyUser);
router.post("/user/deleteAppointment", appointmentController.deleteAppointment);
module.exports = router