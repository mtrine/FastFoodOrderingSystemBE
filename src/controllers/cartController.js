const Cart=require('../models/Cart');
const Food=require('../models/Food');
const CartFood=require('../models/CartFood');
const { where } = require('sequelize');

const  cartController = {
    getCartByUserId: async (req, res) => {
        try {
            const cart = await Cart.findOne({
                where: {
                    UserId: req.params.userId
                },
                include: Food
            });
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    addFoodToCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({
                where: {
                    UserId: req.params.userId
                }
            });
            const food = await Food.findByPk(req.body.foodId);
            await cart.addFood(food, {
                through: {
                    quantity: req.body.quantity
                }
            });
            res.status(200).json({ message: "Food added to cart" });
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteFoodFromCart: async (req, res) => {
        try{
            const cartId=req.params.cartId;
            const foodId=req.body.foodId;
            const foodNeedToDelete=await CartFood.findOne({
                where:{
                    CartId:cartId,
                    FoodId:foodId
                }
            });
            if(!foodNeedToDelete){
                return res.status(404).json({message: "Book not found"});
            }
            await foodNeedToDelete.destroy();
            res.status(200).json({message: "Delete book success"});

        }
        catch(error){
            res.status(400).json(error);
        }
    }
}
module.exports = cartController;