const sequelize = require('../Connection/sequelize')
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");


const Review = sequelize.define("review", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER
    },
    patientId: {
        type: DataTypes.INTEGER
    },
    reviewerName: {
        type: DataTypes.STRING,
    },
    text: {
        type: DataTypes.TEXT
    },
    publicationDate: {
        type: DataTypes.DATE
    },
    rating: {
        type: DataTypes.INTEGER
    },
    isApproved: {
        type: DataTypes.BOOLEAN
    },
    isDisplayed: {
        type: DataTypes.BOOLEAN
    }

});

module.exports = Review