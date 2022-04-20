const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    createdAt: true,
    updatedAt: true,
    modelName: 'user'
})

module.exports = User