const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const FoodType = sequelize.define('FoodType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Food type name must be between 1 and 255 characters."
            }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true
});


sequelize.sync()

module.exports = FoodType;
