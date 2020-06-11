const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const Doctor = sequelize.define("doctor", {
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
    photo: {
        type: DataTypes.BLOB,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    experience: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },
    clinicAddress: {
        type: DataTypes.TEXT
    },
    workType: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.INTEGER
    },
    visitPrice: {
        type: DataTypes.INTEGER
    },
    city: {
        type: DataTypes.STRING
    },
    isApproved: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Doctor