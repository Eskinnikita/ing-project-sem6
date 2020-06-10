const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const DoctorSpecs = sequelize.define("doctorSpec", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
    },
    specId: {
        type: DataTypes.INTEGER,
    }
});

module.exports = DoctorSpecs