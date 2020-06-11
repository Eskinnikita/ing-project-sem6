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
        Doctor.belongsToMany(Spec, { through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, { through: DoctorSpecs, foreignKey: 'specId'})
        const doctors = await Doctor.findAll({
            where: {
                city: city,
                isApproved: true,
                id: {
                    [Op.in]: sequelize.literal(`(SELECT DISTINCT ds.doctorId from doctorSpecs ds WHERE ds.specId = ${specId})`),
                }
            },
            include: [
                {
                    model: Spec
                }
            ]
        })
        res.status(200).send(doctors)
    } catch (e) {
        res.status(500).send({'message': e.message})
    }
})

// router.get('/all', urlencodedParser, async (req, res) => {
//     try {
//         Doctor.belongsToMany(Spec, { through: DoctorSpecs, foreignKey: 'doctorId'})
//         Spec.belongsToMany(Doctor, { through: DoctorSpecs, foreignKey: 'specId'})
//         const doctors = await Doctor.findAll({
//             where: {
//                 isApproved: 1
//             },
//             include: [
//                 {
//                     model: Spec
//                 }
//             ]
//         })
//         res.status(200).send(doctors)
//     } catch (e) {
//         res.status(500).send({'message': e.message})
//     }
// })



module.exports = router
