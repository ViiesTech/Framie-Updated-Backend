const favoriteFunction = require("../functions/favorite");

const addToFavorite = async (req, res) => {
    try {
        const favorite = await favoriteFunction.addToFavorite(req);
        if(!favorite){
            return res.status(200).json({
                success: true,
                msg: "Removed from favorite!",
            });
        } else {
            return res.status(200).json({
                success: true,
                msg: "Added To favorite!",
                data: favorite
            });
        }
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
        const favourites = await favoriteFunction.getAllfavroites(req);
        if(favourites.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Favourites Founds!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Favourites By User!",
                data: favourites
            })
        }
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
    getAllfavroites,
};