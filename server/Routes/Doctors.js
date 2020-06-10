const Doctor = require('../Models/Doctor')
const DoctorSpecs = require('../Models/DoctorSpecs')
const Spec = require('../Models/Spec')
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const sequelize = require('sequelize')
const { Op } = require("sequelize");

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, async (req, res) => {
    try {
        const city = req.body.city
        const specId = req.body.specId
        console.log(city, specId)
        Doctor.hasMany(DoctorSpecs)
        Spec.hasMany(DoctorSpecs, {foreignKey: 'specId'})
        DoctorSpecs.belongsTo(Spec, {foreignKey: 'id'})
        const doctors = await Doctor.findAll({
            where: {
                city: city,
                id: {
                    [Op.in]: sequelize.literal(`(SELECT DISTINCT ds.doctorId from doctorSpecs ds WHERE ds.specId = ${specId})`),
                }
            },
            include: [
                {
                    model: DoctorSpecs,
                    attributes: ['specId'],
                    include: [
                        {
                            model: Spec,
                            required: true
                        }
                    ]
                }
            ]
        })
        res.status(200).send(doctors)
    } catch (e) {
        res.status(500).send({'message': e.message})
    }
})

module.exports = router
