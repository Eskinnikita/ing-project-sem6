const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const Patient = sequelize.define("patient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.BOOLEAN
    },
    role: {
        type: DataTypes.INTEGER
    }
});

module.exports = Patient