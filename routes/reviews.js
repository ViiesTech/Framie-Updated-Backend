const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review");
const clientProfile = require("../controllers/clientProfile");

router.post("/user/addReviews", reviewController.createReview);
router.get("/user/getReviews", reviewController.getReview);
router.get("/user/getAllReviews", reviewController.getAllReviews);
router.post("/admin/deleteReview", reviewController.deleteReviewById);

// Client Profile Routes
router.post("/admin/createClientProfile", clientProfile.createClientProfile);
router.get("/admin/clientProfile", clientProfile.getClientProfile);
router.post("/admin/addNotes", clientProfile.updateNotes);
router.post("/admin/addStylist", clientProfile.addStylist);
router.get("/admin/allClientProfiles", clientProfile.getAllClients);



module.exports = router; 