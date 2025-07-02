const otpModel = require("../models/otpModel");

const generateOTP = async (req) => {
    const { email } = req.body;
    
    const otp = Math.floor(100000 +
        Math.random()* 900000).toString();
    const newOTP = new otpModel({
        email : email,
        OTP : otp
    });
    const result = await newOTP.save();
    return result;
};

const verifyOTP = async (req) =>{
    const { email, OTP} = req.body
    const verify = await otpModel.findOne({email: email, OTP: OTP});
    return verify
};

module.exports = {
    generateOTP,
    verifyOTP
};
