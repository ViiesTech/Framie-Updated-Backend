const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    salonId: {
        type: Schema.Types.ObjectId,
        ref: "Salon",
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
module.exports = favoriteModel;