const FoodType = require('../models/FoodType');
const Food = require('../models/Food');
const foodTypeController = {
    addFoodType: async (req, res) => {
        try {
            const foodType = await FoodType.create({
                name: req.body.name,
                image: req.body.image,
            });
            res.status(201).json(foodType);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAllFoodTypes: async (req, res) => {
        try {
            const foodTypes = await FoodType.findAll(
                { include: Food }
            );
            res.status(200).json(foodTypes);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getFoodType: async (req, res) => {
        try {
            const foodType = await FoodType.findByPk(req.params.id);
            res.status(200).json(foodType);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    updateFoodType: async (req, res) => {
        try {
            const foodType = await FoodType.findByPk(req.params.id);
            await foodType.update({
                name: req.body.name,
                image: req.body.image,
            });
            res.status(200).json(foodType);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteFoodType: async (req, res) => {
        try {
            const foodType = await FoodType.findByPk(req.params.id);
            await foodType.destroy();
            res.status(204).json();
        } catch (error) {
            res.status(400).json(error);
        }
    },
}
module.exports = foodTypeController;