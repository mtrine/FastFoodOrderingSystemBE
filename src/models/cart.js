const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
    // Define any fields if needed
}, {
    timestamps: true,
});


module.exports = Cart;
