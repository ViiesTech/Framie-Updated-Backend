const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user");
const appointmentController = require("../controllers/appointment");

router.post("/user/signup", userController.signUp);
router.post("/user/login", userController.login);
router.post("/user/verifyOTP", userController.verifyOTP);
router.get("/user/getProfile", auth.verifyUser, userController.getProfile);
router.post("/user/updateProfie", auth.verifyUser, userController.updateUser);
router.post("/user/OTP", userController.generateOTP);

module.exports = router;