const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const DoctorDailyScheduleTemplate = sequelize.define("doctorDailyScheduleTemplate", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
    },
    availableTime: {
        type: DataTypes.TIME
    }
});

module.exports = DoctorDailyScheduleTemplate