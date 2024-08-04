const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Food = require('./Food');
const User = require('./Users');
const Favorite = sequelize.define('Favorite', {

},
{
    timestamps: true,
}
);
User.belongsToMany(Food, { through: Favorite, foreignKey: 'userId' });
Food.belongsToMany(User, { through: Favorite, foreignKey: 'foodId' });
module.exports = Favorite;