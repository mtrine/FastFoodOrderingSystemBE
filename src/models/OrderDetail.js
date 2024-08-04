    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = require('../config/db');

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
        timestamps: true 
    }
    );
    module.exports = OrderDetail;