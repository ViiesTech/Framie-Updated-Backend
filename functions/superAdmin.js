const categoryModel = require("../models/category");

// Category Functions

const existingCategory = async (req) => {
    const { categoryName } = req.body;
    const exist = await categoryModel.findOne({
        categoryName: { $regex: categoryName, $options: 'i'}
    });
    if(exist){
        return true
    } else {
        return false
    }
};
const addCategory = async (req) => {
    const newCategory = new categoryModel(req.body);
    const result = await newCategory.save();
    return result;
};

const getCategoryById = async (req) => {
    const { categoryId } = req.query;
    const category = await categoryModel.findById({ _id: categoryId });
    return category;
};

const getAllCategories = async (req) => {

    const categories = await categoryModel.find();
    return categories
};

const updatecategory = async (req) => {
    const { categoryId } = req.body;
    const updatedData = req.body;
    
    const category = await categoryModel.findByIdAndUpdate(categoryId, 
        { $set: updatedData },
        { new: true }
    );
    return category;
};

const deleteCategory = async (req) => {
    const { categoryId } = req.query;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    return category;
};

module.exports = {
    existingCategory,
    addCategory,
    getCategoryById,
    getAllCategories,
    updatecategory,
    deleteCategory,
};