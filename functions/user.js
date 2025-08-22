const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const bcrypt = require("bcrypt");


const signup = async (req) => {
    const { firstName, lastName, phNumber, city, email } = req.body;
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new userModel({
        firstName,
        lastName,
        phNumber,
        city,
        email,
        password: hash,
    });
    const result = await newUser.save();
    return result;
};

const signupByGoogle = async (req) => {
    const { email, firstName, lastName } = req.body;
    const hash = await bcrypt.hash("123456789", 10);
    const newUser = new userModel({
        email,
        firstName,
        lastName,
        password: hash,
        isVerified: true
    });
    const result = await newUser.save();
    return result
}; 

const generateOTP = async (userId) => {
    console.log("object: ", userId)
    
    const otp = Math.floor(100000 +
        Math.random()* 900000).toString();
    const newOTP = new otpModel({
        userId : userId,
        OTP : otp
    });
    const result = await newOTP.save();
    return result;
};

const verifyOTP = async (userId, OTP) =>{
    // const { userId, OTP} = req.body
    const verify = await otpModel.findOne({userId: userId, OTP: OTP});
    return verify
};

const verifyUser = async (userId) => {
    const user = await userModel.findByIdAndUpdate(userId, {$set :{isVerified: true}}, { new: true }).select("-password");
    return user;
};

const getUser = async (req) => {

    const user = await userModel.findOne({email: req.body.email});
    return user;
};

const getProfile = async (req) => {

    let userId = req.body.userId || req.user?.id;
    const user = await userModel.findById({_id: userId}).select("-password");
    return user
};

const updateUser = async (req) => {
    const userId = req.user.id;
    const userData = req.body;

    const updated = await userModel.findByIdAndUpdate({
        _id: userId},
        {$set: userData},
        { new: true });
    return updated;
};

const getUserForOTP = async (userId) =>{
    const user = await userModel.findById(userId).select("-password");
    return user
}

module.exports = {
    signup,
    signupByGoogle,
    generateOTP,
    verifyOTP,
    verifyUser,
    getUser,
    getProfile,
    updateUser,
    getUserForOTP
};