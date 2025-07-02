const favoriteFunction = require("../functions/favorite");

const addToFavorite = async (req, res) => {
    try {
        const favorite = await favoriteFunction.addToFavorite(req);
        return res.status(200).json({
            success: true,
            msg: "Added To favorite!",
            data: favorite
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const favoriteById = async (req, res) => {
    try {
        const favorite = await favoriteFunction.getFavoriteById(req);
        return res.status(200).json({
            success: true,
            msg: "Favorite Details By Id!",
            data: favorite
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const getAllfavroites = async (req, res) => {
    try {
        const favorite = await favoriteFunction.getAllfavroites(req);
        return res.status(200).json({
            success: true,
            msg: "All Favorites By UserId!",
            data: favorite
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const favorite = await favoriteFunction.deleteFavorite(req);
        return res.status(200).json({
            success: true,
            msg: "Favroutie is Removed!"
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(403).json({
            success: false,
            msg: "Having Errors!",
            error: error.message
        });
    }
};

module.exports = {
    addToFavorite,
    favoriteById,
    getAllfavroites,
    deleteFavorite
};