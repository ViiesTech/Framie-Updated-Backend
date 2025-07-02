const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user");
const appointmentController = require("../controllers/appointment");
const royalityController = require("../controllers/royalityPoint");
const favoriteController = require("../controllers/favorite");

// User Auth Routes
router.post("/user/signup", userController.signUp);
router.post("/user/signUpwithGoogle", userController.signInByGoogle);
router.post("/user/login", userController.login);
router.post("/user/verifyOTP", userController.verifyOTP);
router.get("/user/getProfile", auth.verifyUser, userController.getProfile);
router.post("/user/updateProfie", auth.verifyUser, userController.updateUser);
router.post("/user/OTP", userController.generateOTP);

// User Royality Points Routes
router.get("/user/getRoyalityProfiles", royalityController.getAllRoyalityProfileByUser);
router.get("/user/totalRoyalityPoints", royalityController.getTotalRoyalityPointsByUser);

// User Favorite Routes
router.post("/user/addToFavorite", favoriteController.addToFavorite);
router.get("/user/favoriteById", favoriteController.favoriteById);
router.get("/user/allFavoritesByUser", favoriteController.getAllfavroites);
router.post("/user/deleteFavorite", favoriteController.deleteFavorite);


module.exports = router;