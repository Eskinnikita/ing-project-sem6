const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const Visit = sequelize.define("visit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
    },
    patientId: {
        type: DataTypes.INTEGER
    },
    slotId: {
        type: DataTypes.INTEGER
    },
    patientName: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.TEXT
    }
});

module.exports = Visit