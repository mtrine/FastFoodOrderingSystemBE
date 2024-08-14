const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./Users');
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
    address:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Address must be between 1 and 255 characters."
            }
        }
    },
    note:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Phone must be between 1 and 255 characters."
            }
        }
    },
},
{
    timestamps: false
}

);
Order.belongsTo(User);
User.hasMany(Order);

sequelize.sync()
module.exports = Order;