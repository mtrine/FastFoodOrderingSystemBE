const { or } = require('sequelize');
const Order = require('../models/Order');
const Food = require('../models/Food');
const Cart = require('../models/Cart');
const CartFood = require('../models/CartFood');

const orderController = {
    createOrder: async (req, res) => {
        try {
            var total= 0;
            const cart = await Cart.findOne({
                where: {
                    userId: req.params.userId
                },
            });
            const cartFoods = await CartFood.findAll({
                where:{
                    cartId: cart.id
                },
            });
            
            for (var items of cartFoods){ 
                const food = await Food.findByPk(items.foodId);
                total += food.price * items.quantity;
            }
            const order = await Order.create({
                UserId: req.params.userId,
                total: total,
                status: 'processing',
            });
            for (var items of cartFoods){ 
                const food = await Food.findByPk(items.foodId);
                await order.addFood(food, { through: { quantity: items.quantity } });
                await items.destroy();
            }

            res.status(200).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(400).json({ error: error.message });
        }
    },
    getOrdersByUserId: async (req, res) => {
        try {
            const orders = await Order.findAll({
                where: {
                    userId: req.params.userId
                }
            });
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(400).json({ error: error.message });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            await order.update({
                status: req.body.status,
            });
            res.status(200).json(order);
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(400).json({ error: error.message });
        }
    },
}

module.exports = orderController;
