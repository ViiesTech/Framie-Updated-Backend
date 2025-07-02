const favoriteModel = require("../models/favouriteModel");

const addToFavorite = async (req) => {
    const newFavorite = new favoriteModel(req.body);
    const result = await newFavorite.save();
    return result
};

const getFavoriteById = async (req) => {
    const { favoriteId } = req.query;
    const result = await favoriteModel.findById({_id: favoriteId}).populate("salonId");
    return result
};

const getAllfavroites = async (req) => {
    const { userId } = req.query;
    const result = await favoriteModel.find({userId: userId}).populate("salonId");
    return result
};

const deleteFavorite = async (req) => {
    const { favoriteId } = req.query;
    const result = await favoriteModel.findByIdAndDelete({_id: favoriteId});
    return result;
};

module.exports = {
    addToFavorite,
    getFavoriteById,
    getAllfavroites,
    deleteFavorite
};
