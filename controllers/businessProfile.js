const businessProfileFunction = require("../functions/businessProfile");
const adminFunction = require("../functions/admin");

const addBusinessProfile = async (req, res) => {
    try {
        const createBusiness = await businessProfileFunction.addBusinessProfile(req);
        if( createBusiness.length === 0){
            return res.status(403).json({
                success : false,
                msg: "No business Profile Created!"
            })
        } else {
            await adminFunction.updateBusiness(req); 
            return res.status(200).json({
                success: true,
                msg: "Business Profile Created Successfully!",
                data: createBusiness
            })
        }; 
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const getBusinessProfile = async (req, res) => {
    try {
        const businessProfile = await businessProfileFunction.getBusinessProfile(req);
        return res.status(200).json({
            success: true,
            msg: "Business Profile!",
            data: businessProfile
        }) 
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        })
    }
};

const updateBusinessProfile = async (req, res) => {
    try {
        const updatedBusiness = await businessProfileFunction.updateBusinessProfile(req);
        return res.status(200).json({
            success: true,
            msg: "Business Profile Updated Successfully!",
            data: updatedBusiness
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        }) 
    }
};

const getAllBusinessProfiles = async (req, res) => {
    try {
        const allProfiles = await businessProfileFunction.getAllBusinessProfiles(req);
        return res.status(200).json({
            success: true,
            msg: "All Business Profiles!",
            data: allProfiles
        })
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error
        }) 
    }
};

module.exports = {
    addBusinessProfile,
    getBusinessProfile,
    updateBusinessProfile,
    getAllBusinessProfiles
};
