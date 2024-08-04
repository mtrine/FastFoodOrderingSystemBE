const Food =require('../models/Food');
const FoodType = require('../models/FoodType');
const foodController = {
    addFood: async (req, res) => {
        try {
            const food = await Food.create({
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                FoodTypeId: req.body.FoodTypeId,
            });
            res.status(201).json(food);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAllFoods: async (req, res) => {
        try {
            const foods = await Food.findAll({
                include: FoodType
            });
            res.status(200).json(foods);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getFood: async (req, res) => {
        try {
            const food = await Food.findByPk(req.params.id);
            res.status(200).json(food);
        } catch (error) {
            res.status(400).json(error);
        }
    },
}
module.exports = foodController;