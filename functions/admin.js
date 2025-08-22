const adminModel = require("../models/AdminModel");
const billingModel = require("../models/billingModel");
const bcrypt = require("bcrypt");

//Admin Functions
const signUp = async (decode) => {
    const { firstName, lastName, email, password, phNumber, city, image } = decode
    const hash = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({
        firstName,
        lastName,
        email,
        password: hash,
        phNumber,
        city,
        profileImage: image
    });
    const result = await newAdmin.save();
    return result;
};

const getUser = async (req) => {
    const admin = await adminModel.findOne({email: req.body.email});
    return admin; 
};

const adminById = async (adminId) => {
    const admin = await adminModel.findById(adminId).select("-password");
    return admin;
}

const updateProfile = async (req) => {
    // const userId = req.admin._id;
    const { adminId } = req.body
    const updatedData = req.body;
    if(req.file && req.file.filename){
        updatedData.profileImage = req.file.filename
    }
    const admin = await adminModel.findByIdAndUpdate(adminId,
        { $set: updatedData },
        { new: true }
    ).select("-password");
    return admin;
};

// Admin Billing Functions
const addBillingDetails = async (req) => {
    const newBilling = new billingModel(req.body);
    const result = await newBilling.save();
    return result;
};

const findBilling = async (req) => {
    const username = req.body.adminId;
    const exists = await billingModel.findOne({adminId: username});
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
    const admin = await adminModel.findByIdAndUpdate({ _id: adminId},
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

const getAdminByAdminId = async (req) => {
    const { adminId } = req.query;
    const admin = await adminModel.findById({_id: adminId}).select("-password");
    return admin
};

module.exports = { 
    signUp,
    getUser,
    adminById,
    updateProfile,
    addBillingDetails,
    findBilling,
    updateBillingDetails,
    getBillingDetails,
    updateBusiness,
    updateBilling,
    getAdminByAdminId
};

