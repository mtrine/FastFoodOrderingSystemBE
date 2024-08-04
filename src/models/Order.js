const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./Users');
const Food = require('./Food');
const OrderDetail = require('./OrderDetail');
const Order = sequelize.define('Order', {
    total:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "Total must be an integer."
            }
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Status must be between 1 and 255 characters."
            }
        }
    },
},
{
    timestamps: true 
}
);
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Food ,{ through: OrderDetail });
Food.belongsToMany(Order, { through: OrderDetail });
sequelize.sync()
module.exports = Order;