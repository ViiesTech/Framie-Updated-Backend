const express = require("express");
const router = express.Router();

const superAdminController = require("../controllers/superAdmin");

// Category Routes
router.post("/superAdmin/addCategory", superAdminController.addCategory);
router.get("/superAdmin/getCategoryById", superAdminController.getCategoryById);
router.get("/superAdmin/getAllCategories", superAdminController.getAllCategories);
router.post("/superAdmin/updateCategory", superAdminController.updateCategory);
router.post("/superAdmin/deleteCategory", superAdminController.deleteCategory);



module.exports = router;