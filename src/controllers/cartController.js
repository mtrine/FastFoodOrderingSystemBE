const Cart = require('../models/Cart');
const Food = require('../models/Food');
const CartFood = require('../models/CartFood');
const { where } = require('sequelize');

const cartController = {
    getCartByUserId: async (req, res) => {
        try {
            const cart = await Cart.findOne({
                where: {
                    UserId: req.params.userId
                },
                include: [
                    {
                        model: Food,
                        through: { attributes: ['quantity'] } // Ensure to include the attributes from the join table if needed
                    }
                ]
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
            if (!cart || !food) {
                return res.status(404).json({ message: "Cart or food not found" });
            }
            
            // Check if the food is already in the cart
            const cartFood = await CartFood.findOne({
                where: {
                    CartId: cart.id,
                    FoodId: req.body.foodId
                }
            });

            if (cartFood) {
                // If food is already in the cart, update the quantity
                cartFood.quantity += req.body.quantity;
                await cartFood.save();
            } else {
                // If food is not in the cart, add it
                await cart.addFood(food, {
                    through: {
                        quantity: req.body.quantity
                    }
                });
            }

            res.status(200).json({ message: "Food added to cart" });
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteFoodFromCart: async (req, res) => {
        try {
            const cartId = req.params.cartId;
            const foodId = req.body.foodId;
            const foodNeedToDelete = await CartFood.findOne({
                where: {
                    CartId: cartId,
                    FoodId: foodId
                }
            });
            if (!foodNeedToDelete) {
                return res.status(404).json({ message: "Food not found" });
            }
            await foodNeedToDelete.destroy();
            res.status(200).json({ message: "Delete food success" });
        } catch (error) {
            res.status(400).json(error);
        }
    },
    updateCart: async (req, res) => {
        try {
            const { userId } = req.params; // Receive cartId and foodId from params
            const { quantity, foodId } = req.body; // Receive quantity from body

            // Find the cart and the food
            const cart = await Cart.findOne({
                where: {
                    UserId: userId
                }
            });
            const food = await Food.findByPk(foodId);

            if (!cart || !food) {
                return res.status(404).json({ message: "Cart or food not found" });
            }

            // Find the link between cart and food
            const cartFood = await CartFood.findOne({
                where: {
                    CartId: cart.id,
                    FoodId: foodId
                }
            });

            if (!cartFood) {
                return res.status(404).json({ message: "Food not found in cart" });
            }

            // Update the quantity
            cartFood.quantity = quantity;
            await cartFood.save();

            res.status(200).json({ message: "Cart updated successfully" });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = cartController;
