const adminFunction = require("../functions/admin");
const validations = require("../functions/validate");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
    try {
        const validate = await validations.validateAdmin(req);
        if(validate){
            return res.status(200).json({
                success: false,
                msg: "Email Is Already Taken"
            })
        } else {
            let admin = await adminFunction.signUp(req);
            // let admin;
            let token = jwt.sign({
                id: admin._id,
                email: admin.email,
                phNumber: admin.phNumber,
                name: admin.firstName+" "+admin.lastName,
                profileImage: admin.profileImage
            }, process.env.SECRET_KEY,{ expiresIn: "2 days"})
            return res.status(200).json({
                success: true,
                msg: "Admin Signned Up Successfully!",
                data:{
                    id: admin._id,
                    email: admin.email,
                    city: admin.city,
                    phNumber: admin.phNumber,
                    name: admin.firstName+" "+admin.lastName,
                    profileImage: admin.profileImage,
                    businessProfile: admin.businessProfile,
                    billingDetails: admin.billingDetails
                }, accessToke: token
            })
        }
    } catch (error) {
        console.log("having errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error
        })
    };
};

const login = async (req, res) => {
    try {
        const validate = await validations.validateAdmin(req);
        if(!validate){
            return res.status(200).json({
                sucess: false,
                msg: "Email Do Not Exist!"
            })
        } else{
            const admin = await adminFunction.getUser(req);
            const verifyPassword = await validations.verifyAdminPass(req.body.password, admin.password)
            if(!verifyPassword){
                return res.status(200).json({
                    success: false,
                    msg: "Inavlid Password!"
                })
            } else {
                let token = jwt.sign({
                    id: admin._id,
                    email: admin.email,
                    phNumber: admin.phNumber,
                    name: admin.firstName+" "+admin.lastName,
                    profileImage: admin.profileImage
    
                }, process.env.SECRET_KEY, {expiresIn: "2 days"})
                return res.status(200).json({
                    sucess: true,
                    msg: "Admin Logged In Successfully!",
                    data: {
                        id: admin._id,
                        email: admin.email,
                        city: admin.city,
                        phNumber: admin.phNumber,
                        name: admin.firstName+" "+admin.lastName,
                        profileImage: admin.profileImage,
                        businessProfile: admin.businessProfile,
                        billingDetails: admin.billingDetails
                    }, aceessToken: token
                })
            } 
        }
    } catch (error) {
        console.log("having errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error
        })
    };
};

const updateProfile = async (req, res) => {
    try {
        const updatedAdmin = await adminFunction.updateProfile(req);
        return res.status(200).json({
            sucess: true,
            msg: "Profile Updated Successfully!",
            data: updatedAdmin
        })
    } catch (error) {
        console.log("having errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error
        })
    };
};

const addBillingDetails = async (req, res) => {
    try {
        const userName = await adminFunction.findBilling(req);
        if(userName){
            return res.status(403).json({
                success: false,
                msg: "userName Already Taken!"
            })
        } else {
            const billing = await adminFunction.addBillingDetails(req);
            const billingTrue = await adminFunction.updateBilling(req); 
            return res.status(200).json({
                success: true,
                msg: "Billing Details Added Successfully!",
                data: billing
            })
        }
    } catch (error) {
        console.log("having errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error
        })
    };
};

const updatedBillingDetails = async (req, res) => {
    try {
        const updatedBilling = await adminFunction.updateBillingDetails(req);
        return res.status(200).json({
            sucess: true,
            msg: "Billing Details Updated Successfully!",
            data: updatedBilling
        })
    } catch (error) {
        console.log("having errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error
        })
    };
};

const getBillingDetails = async (req, res) => {
    try {
        const details = await adminFunction.getBillingDetails(req);
        return res.status(200).json({
            success: true,
            msg: "Admin's Billing Details!",
            data: details
        })
    } catch (error) {
        console.log("having errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error
        })
    };
};

module.exports = {
    signup,
    login,
    updateProfile,
    addBillingDetails,
    updatedBillingDetails,
    getBillingDetails
};