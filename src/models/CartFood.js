const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cart = require('./Cart');
const Food = require('./Food');

const CartFood = sequelize.define('CartFood', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "Quantity must be an integer."
            }
        }
    },
}, {
    timestamps: true,
});

Cart.belongsToMany(Food, { through: CartFood, foreignKey: 'cartId' });
Food.belongsToMany(Cart, { through: CartFood, foreignKey: 'foodId' });

module.exports = CartFood;
