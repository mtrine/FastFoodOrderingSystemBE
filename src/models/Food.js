const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const FoodType = require('./FoodType');
const Food = sequelize.define('Food', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Book name must be between 1 and 255 characters."
            }
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "Price must be an integer."
            }
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },

},
{
    timestamps: false 
}
);
Food.belongsTo(FoodType);
FoodType.hasMany(Food);
sequelize.sync()

module.exports = Food;