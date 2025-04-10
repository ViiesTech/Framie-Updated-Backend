const revireFunction = require("../functions/review");

const createReview = async (req, res) => {
    try {
        const review = await revireFunction.createReview(req);
        return res.status(200).json({
            success: true,
            msg: "Revire Created!",
            data: review
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "having Errors!",
            error: error.message
        })
    }
};

const getReview = async (req, res) => {
    try {
        const reviews = await revireFunction.getReviewsByType(req);
        return res.status(200).json({
            success: true,
            msg: "All Reviews!",
            data: reviews
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "having Errors!",
            error: error.message
        })
    }
};

const getAllReviews = async (req, res) => {
    try {
        const allReviews = await revireFunction.getAllReviewsByAdmin(req);
        if(allReviews.length === 0){
            return res.status(200).json({
                success: false,
                msg: "No Reviews Found by Admin Id!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Reviews by Admin Id!",
                data: allReviews
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "having Errors!",
            error: error.message
        })
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const review = await revireFunction.deleteReview(req);
        return res.status(200).json({
            success: true,
            msg: "Review is Deleted Successfully!"
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "having Errors!",
            error: error.message
        })
    }
};

module.exports = {
    createReview,
    getReview,
    getAllReviews,
    deleteReviewById
};