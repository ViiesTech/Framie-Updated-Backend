const adminModel = require("../models/AdminModel");
const billingModel = require("../models/billingModel");
const bcrypt = require("bcrypt");

//Admin Functions
const signUp = async (req) => {
    const newAdmin = new adminModel(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    newAdmin.password = hash;
    newAdmin.profileImage = req.file.filename;
    const result = await newAdmin.save();
    return result;
};

const getUser = async (req) => {
    const admin = await adminModel.findOne({email: req.body.email});
    return admin; 
};

const updateProfile = async (req) => {
    // const userId = req.admin._id;
    const { id } = req.body
    if(req.file && req.file.filename){
        const imagePath = req.file.filename;
        console.log("first :", imagePath);
        const updatedData = req.body;
        const updatedAdmin = await adminModel.findByIdAndUpdate({_id: id}, 
            {$set: updatedData, profileImage:imagePath }, 
            { new: true }).select("-password");
        return updatedAdmin;
    } else {
        const updatedData = req.body;
        console.log("Updated Data: ", updatedData);
        const updatedAdmin = await adminModel.findByIdAndUpdate({_id: id}, 
            {$set: updatedData }, 
            { new: true }).select("-password");
        return updatedAdmin;
    }

};

// Admin Billing Functions
const addBillingDetails = async (req) => {
    const newBilling = new billingModel(req.body);
    const result = await newBilling.save();
    return result;
};

const findBilling = async (req) => {
    const username = req.body.username;
    const exists = await billingModel.findOne({username: username});
    if(exists){
        return true
    } else {
        return false
    };
};  

const updateBillingDetails = async (req) => {
    // console.log("data :", req.body);
    const billingId = req.body.billingId;
    // console.log("Id :", billingId);
    const updatedData = req.body;
    const updatedBilling = await billingModel.findByIdAndUpdate(billingId, { $set: updatedData }, { new: true });
    return updatedBilling;
};

const getBillingDetails = async (req) => {
    const adminId = req.admin.id;
    console.log("Admin", adminId);
    const billing = await billingModel.findOne({adminId: adminId});
    return billing
};

const updateBusiness = async (req) => {
    const adminId = req.admin.id;
    const admin = await adminModel.findByIdAndUpdate({adminId : adminId},
        { $set: {businessProfile: true}},
        { new: true}
    );
    return admin
};

const updateBilling = async (req) => {
    const {adminId} = req.body;
    const update = await adminModel.findByIdAndUpdate(adminId,
        {$set: { billingDetails: true }},
        { new: true }
    );
    return update;
};

module.exports = { 
    signUp,
    getUser,
    updateProfile,
    addBillingDetails,
    findBilling,
    updateBillingDetails,
    getBillingDetails,
    updateBusiness,
    updateBilling
};

