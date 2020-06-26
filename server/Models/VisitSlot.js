const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const VisitSlot = sequelize.define("visitSlot", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
    },
    visitTime: {
        type: DataTypes.TIME
    },
    visitDate: {
        type: DataTypes.DATEONLY
    },
    isAvailable: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = VisitSlot