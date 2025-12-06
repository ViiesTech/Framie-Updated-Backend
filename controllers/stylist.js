const validationFunction = require("../functions/validate");
const stylistFunction = require("../functions/stylist");
const jwt = require("jsonwebtoken");
const appointmointModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const stylistModel = require("../models/stylist");
const walkinModel = require("../models/walkinCustomer");
require("dotenv").config();

const login = async (req, res) => {
    try {
        const validate = await validationFunction.validateStylist(req);
        if (!validate) {
            return res.status(200).json({
                success: false,
                msg: "Invalid Email!"
            })
        } else {
            const stylist = await stylistFunction.getStylist(req);
            const password = req.body.password;
            const hash = stylist.password;
            const verify = await validationFunction.verifyPassword(password, hash);
            if (!verify) {
                return res.status(200).json({
                    success: false,
                    msg: "Invalid Credentials!"
                })
            } else {
                const userId = stylist._id;
                const stylistData = await stylistFunction.getStylistProfile(req, userId);
                let token = jwt.sign({
                    _id: stylistData._id,
                    email: stylistData.email,
                    createdBy: stylistData.createdBy
                }, process.env.SECRET_KEY, { expiresIn: "1y" });

                return res.status(200).json({
                    success: true,
                    msg: "Stylist Logged-In Successfully!",
                    data: stylistData,
                    accessToken: token
                })
            }
        }
    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
}

const addStylist = async (req, res) => {
    try {
        const validate = await validationFunction.validateStylist(req);
        if (validate) {
            return res.status(200).json({
                success: false,
                msg: "Stylist Already Exist!"
            })
        } else {
            const stylist = await stylistFunction.addStylist(req);
            return res.status(200).json({
                success: true,
                msg: "Stylist Added Successfully!",
                data: stylist
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

const getAllStylistsByAdmin = async (req, res) => {
    try {
        const allStylists = await stylistFunction.getAllStylistsByAdmin(req);
        return res.status(200).json({
            success: true,
            msg: "All Stylists By AdminId",
            data: allStylists
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

const getStylistProfile = async (req, res) => {
    try {
        const stylist = await stylistFunction.getStylistProfile(req);
        return res.status(200).json({
            sucess: true,
            msg: "Stylist Profile!",
            data: stylist
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

const updateStylist = async (req, res) => {
    try {
        const updatedStylist = await stylistFunction.updateStylist(req);
        return res.status(200).json({
            success: true,
            msg: "Stylist Profile Updated Successfylly!",
            data: updatedStylist
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

const deleteStylist = async (req, res) => {
    try {
        const stylist = await stylistFunction.deleteStylist(req);
        return res.status(200).json({
            success: true,
            msg: "Stylist is Deleted!"
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

const addSubservicesToStylist = async (req, res) => {
    try {
        const stylist = await stylistFunction.addSubservicesToStylist(req);
        if (!stylist) {
            return res.status(200).json({
                success: false,
                msg: "No Stylist Found To Add Service!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Service is Added to Stylist!",
                data: stylist
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

const getDashboardStats = async (req, res) => {
    try {
        const { stylistId } = req.params
        if (!stylistId) {
            return res.status(400).json({ success: false, msg: "stylistId is required" });
        }

        const stylist = await stylistModel.findById(stylistId);
        if (!stylist) return res.status(404).json({ success: false, msg: "Stylist not found" });

        const activeWorkingDaysCount = stylist.workinDays.filter(day => day.isActive).length;

        // Count Pending
        const pendingCount = await appointmointModel.countDocuments({
            stylist: stylistId,
            status: "Pending"
        });

        // Count Completed
        const completedCount = await appointmointModel.countDocuments({
            stylist: stylistId,
            status: "Completed"
        });

        // GET ALL APPOINTMENTS OF THIS STYLIST
        const appointments = await appointmointModel.find({
            stylist: stylistId
        }).select("userId"); // Only need userId


        // FIND UNIQUE CUSTOMERS (no duplicate customer)
        const userIds = [...new Set(appointments.map(appt => appt.userId.toString()))];

        const totalCustomers = userIds.length;

        // NEW CUSTOMERS (created last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const newCustomers = await userModel.countDocuments({
            _id: { $in: userIds },
            createdAt: { $gte: thirtyDaysAgo }
        });

        const walkinCount = await walkinModel.countDocuments({
            stylist: stylistId
        });


        return res.status(200).json({
            success: true,
            msg: 'Dashboard stats',
            stats: {
                pending: pendingCount,
                completed: completedCount,
                totalCustomers,
                newCustomers,
                workingDays: activeWorkingDaysCount,
                walkinCustomers: walkinCount
            }
        });

    } catch (error) {
        console.log("Having Errors: ", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors",
            error: error.message
        })
    }
}

module.exports = {
    addStylist,
    login,
    getAllStylistsByAdmin,
    getStylistProfile,
    updateStylist,
    deleteStylist,
    addSubservicesToStylist,
    getDashboardStats
};