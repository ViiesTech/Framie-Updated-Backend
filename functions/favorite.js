const favoriteModel = require("../models/favouriteModel");
const businessProfileModel = require("../models/businessProfile");

const addToFavorite = async (req) => {
    const { salonId, userId } = req.body;
    const salon = await businessProfileModel.findById(salonId);
    if(salon.favoriteBy.includes(userId)){
        const favouriteSalon = await businessProfileModel.findByIdAndUpdate(salonId,
            { $pull: { favoriteBy: userId } },
            { new: true }
        );
        const favourite = await favoriteModel.findOneAndDelete({userId, salonId});
        console.log("Removed From Favourites!");
        return null;
    } else {
        const favouriteSalon = await businessProfileModel.findByIdAndUpdate(salonId, 
            { $push: { favoriteBy: userId } },
            { new: true }
        );
        const newFavourite = new favoriteModel({
            salonId,
            userId
        });
        const result = await newFavourite.save();
        console.log("Added To Favourites!");
        return result;
    };
};

const getAllfavroites = async (req) => {
    const { userId } = req.query;
    const favourites = await favoriteModel.find({userId: userId}).populate("salonId");
    return favourites;
}

module.exports = {
    addToFavorite,
    getAllfavroites
};
