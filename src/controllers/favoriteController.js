const Favorite = require('../models/Favorite');
const Food = require('../models/Food');
const User = require('../models/Users');

const favoriteController = {
    addFavorite: async (req, res) => {
        try {
            const favorite = await Favorite.create({
                userId: req.params.userId,
                foodId: req.body.foodId,
            });
            res.status(201).json(favorite);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAllFavorites: async (req, res) => {
        try {
            const favorites = await Favorite.findAll({
                include: Food
            });
            res.status(200).json(favorites);
        } catch (error) {
            res.status(400).json(error);
        }
    },
}
module.exports = favoriteController;