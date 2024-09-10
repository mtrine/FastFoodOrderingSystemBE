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
    getFoodByFoodType:async(req,res)=>{
        try {
            const foodTypeId = req.params.foodTypeId;  // Lấy foodTypeId từ tham số đường dẫn
            const foods = await Food.findAll({
                where: { FoodTypeId: foodTypeId },
                include: FoodType
            });
            res.status(200).json(foods);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    
    updateFood: async (req, res) => {
        try {
            const foodId = req.params.id; // Lấy ID của món ăn từ URL
            const { name, price, image, FoodTypeId } = req.body; // Lấy thông tin mới từ body request

            const food = await Food.findByPk(foodId);
            if (!food) {
                return res.status(404).json({ message: "Food not found" });
            }

            // Cập nhật thông tin món ăn
            await food.update({ name, price, image, FoodTypeId });
            

            res.status(200).json(food); // Trả về thông tin món ăn đã cập nhật
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteFood: async (req, res) => {
    
        try {
            const foodId = req.params.id; // Lấy ID của món ăn từ URL

            const food = await Food.findByPk(foodId);
            if (!food) {
                return res.status(404).json({ message: "Food not found" });
            }

            // Xóa món ăn
            await food.destroy();

            res.status(204).send(); // Trả về phản hồi không có nội dung
        } catch (error) {
            res.status(400).json(error);
        }
    }

}
module.exports = foodController;