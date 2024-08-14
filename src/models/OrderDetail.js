    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = require('../config/db');
    const Food = require('./Food');
    const Order = require('./Order');
    const OrderDetail = sequelize.define('OrderDetail', {
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Quantity must be an integer."
                }
            }
        },
    },
    {
        timestamps: false
    }
    );
    Order.belongsToMany(Food ,{ through: OrderDetail });
    Food.belongsToMany(Order, { through: OrderDetail });
    module.exports = OrderDetail;