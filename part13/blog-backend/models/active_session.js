const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ActiveSession extends Model {}

ActiveSession.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
    },
    username: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false
})

module.exports = ActiveSession