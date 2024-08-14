const { or } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('../models/Order');
const Food = require('../models/Food');
const Cart = require('../models/Cart');
const CartFood = require('../models/CartFood');
const OrderDetail = require('../models/OrderDetail');
const orderController = {
    createOrder: async (req, res) => {
        try {
            try {
                const selectedItems = req.body.selectedItems;
        
                if (!selectedItems || selectedItems.length === 0) {
                    return res.status(400).json({ error: 'No items selected' });
                }
                
                const cart = await Cart.findOne({
                    where: {
                        UserId: req.params.userId
                    },
                });
                // Tìm thông tin về các món ăn được chọn
                const foods = await Food.findAll({
                    where: {
                        id: selectedItems.map(item => item.foodId)
                    }
                });
        
                // Tính tổng giá trị của order
                const totalAmount = selectedItems.reduce((total, item) => {
                    const food = foods.find(f => f.id === item.foodId);
                    return total + (food.price * item.quantity);
                }, 0);
        
                // Tạo order mới
                const order = await Order.create({
                    UserId: req.params.userId,
                    note: req.body.note,
                    address: req.body.address,
                    total: totalAmount,
                    status: 'processing' // Bạn có thể thay đổi trạng thái mặc định nếu cần
                });
        
                // Thêm các sản phẩm đã chọn vào order
            
                for (const item of selectedItems) {
                    const food = foods.find(f => f.id === item.foodId);
                    await order.addFood(food, { 
                        through: { quantity: item.quantity, price: food.price }
                    });
                }

                // Xóa cart sau khi đã tạo order
                await CartFood.destroy({
                    where: {
                        cartId: cart.id,
                        foodId: selectedItems.map(item => item.foodId)
                    }
                });
                res.status(201).json({message: 'Order created successfully'});
            } catch (error) {
                console.error('Error creating order:', error);
                res.status(400).json({ error: error.message });
            }
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
                },
                include: [
                    {
                        model: Food,
                        through: { attributes: ['quantity'] }
                    }
                ]
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

    getTopOrderedFoods: async (req, res) => {
        try {
            const [results, metadata] = await sequelize.query(`
                SELECT *, COUNT(OrderDetails.FoodId) AS orderCount
                FROM Food
                JOIN OrderDetails ON Food.id = OrderDetails.FoodId
                GROUP BY Food.id
                ORDER BY orderCount DESC
                LIMIT 10;
            `);

            res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching top ordered foods:', error);
            res.status(400).json({ error: error.message });
        }
    },
}

module.exports = orderController;
