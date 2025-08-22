const superAdminFunctions = require("../functions/superAdmin");

const addCategory = async (req, res) => {
    try {
        const exist = await superAdminFunctions.existingCategory(req);
        if(!exist){
            const category = await superAdminFunctions.addCategory(req);
            return res.status(200).json({
                success: true,
                msg: "Category Added Successfully!",
                data: category
            }) 
        } else {
            return res.status(200).json({
                success: false,
                msg: "Category Already Exists!"
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await superAdminFunctions.getCategoryById(req);
        if(!category){
            return res.status(200).json({
                success: false,
                msg: "No Category Found By Id!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Category Details By Id!",
                data: category
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }    
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await superAdminFunctions.getAllCategories(req);
        if(categories.length === 0){
            return res.status(200).json({
                success: false,
                msg: "No Categories Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Categories!",
                date: categories
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await superAdminFunctions.updatecategory(req);
        if(!category){
            return res.status(200).json({
                success: false,
                msg: "No Category Found to Update!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Category Updated!",
                data: category
            })
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }    
};

const deleteCategory = async (req, res) => {
    try {
        const category = await superAdminFunctions.deleteCategory(req);
        return res.status(200).json({
            success: true,
            msg: "Category Deleted!"
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }    
};

module.exports = {
    addCategory,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory
};