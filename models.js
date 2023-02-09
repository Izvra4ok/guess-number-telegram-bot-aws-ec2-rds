const sequelize = require("./database")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false,
        references: {
            model: "user",
            key: "id",
        }
    },
    chatId: {
        type: DataTypes.INTEGER, unique: true, allowNull: false,
        references: {
            model: "user",
            key: "chatId",
        }
    },
    right: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false,},
    wrong: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false,}
})

module.exports = User