const reviewModel = require("../models/appReview");

const createReview = async (req) => {
    const newReview = new reviewModel(req.body)
    const result = await newReview.save();
    return result
};

const getReviewsByType = async (req) => {
    const {type, stars} = req.query;
    if(type === "App"){
        if(stars){
            const { stars } = req.query;
            const review = await reviewModel.find({type: type, stars: stars}).populate({
                path: "reviewBy",
                select: "-password"
            });
            return review;
        } else {
            const review = await reviewModel.find({type: type}).populate({
                path: "reviewBy",
                select: "-password"
            });
            return review;
        }
    } else if(type === "Service"){
        if(stars){
            const { stars, subServiceId } = req.query;
            console.log("first :", subServiceId)
            const review = await reviewModel.find({type: type, onService: subServiceId, stars: stars}).populate({
                path: "reviewBy",
                select: "-password"
            }).populate("onService");
            return review;
        } else {
            const { subServiceId } = req.query;
            console.log("first :", subServiceId)
            const review = await reviewModel.find({type: type, onService: subServiceId}).populate({
                path: "reviewBy",
                select: "-password"
            }).populate("onService");
            return review;
        }
    } else {
        if(stars){
            const { stars, employeeId } = req.query;
            const review = await reviewModel.find({type: type, onStylist: employeeId, stars: stars}).populate({
                path: "reviewBy",
                select: "-password"
            }).populate("onStylist");
            return review;
        } else {
            const { employeeId } = req.query;
            const review = await reviewModel.find({type: type, onStylist: employeeId}).populate({
                path: "reviewBy",
                select: "-password"
            }).populate("onStylist");
            return review;
        }
    }
};

const getAllReviewsByAdmin = async (req) => {
    const {adminId} = req.query;
    const result = await reviewModel.find({adminId: adminId}).populate({
        path: "reviewBy",
        select: "firstName lastName"
    }).populate({
        path: "onService",
        select: "title",
        populate: {
            path: "serviceId",
            model: "Service",
            select: "Title"
        }
    })
    return result;
};

module.exports = {
    createReview, 
    getReviewsByType,
    getAllReviewsByAdmin
}

