const Doctor = require('../Models/Doctor')
const DoctorSpecs = require('../Models/DoctorSpecs')
const Spec = require('../Models/Spec')
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const sequelize = require('sequelize')
const {Op} = require("sequelize");

const urlencodedParser = bodyParser.urlencoded({extended: false});

//login doctor in system
router.post('/login', async (req, res) => {
    try {
        await Doctor.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => res.status(404).send(err));
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

//find doctors by city and specialization
router.post('/', urlencodedParser, async (req, res) => {
    try {
        const city = req.body.city
        const specId = req.body.specId
        Doctor.belongsToMany(Spec, {through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, {through: DoctorSpecs, foreignKey: 'specId'})
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

//get all doctors
router.get('/all', urlencodedParser, async (req, res) => {
    try {
        Doctor.belongsToMany(Spec, {through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, {through: DoctorSpecs, foreignKey: 'specId'})
        const doctors = await Doctor.findAll({
            where: {
                isApproved: 1
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


//add doctor to approving admin list
router.post('/new-partner', async (req, res) => {
    try {
        await Doctor.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            photo: req.body.photo,
            phoneNumber: req.body.phoneNumber,
            experience: req.body.experience,
            description: req.body.description,
            clinicAddress: req.body.clinicAddress,
            workType: req.body.workType,
            visitPrice: req.body.visitPrice,
            city: req.body.city,
            isApproved: req.body.isApproved,
            role: 2
        })
            .then(result => {
                const specsArr = req.body.specs.map(el => {
                    return {
                        doctorId: result.dataValues.id,
                        specId: el.id
                    }
                })
                DoctorSpecs.bulkCreate(specsArr).then(results => {
                    res.status(200).send(results)
                })
            })
            .catch(e => {
                console.log('ERROr', e.message)
            })
    } catch (e) {
        res.status(500).send({'message': e.message})
    }
})

//get not approved doctors
router.get('/not-approved', urlencodedParser, async (req, res) => {
    try {
        Doctor.belongsToMany(Spec, {through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, {through: DoctorSpecs, foreignKey: 'specId'})
        const doctors = await Doctor.findAll({
            where: {
                isApproved: 0
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

//get doctor by Id
router.get('/:id', async (req, res) => {
    try {
        Doctor.belongsToMany(Spec, {through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, {through: DoctorSpecs, foreignKey: 'specId'})
        await Doctor.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Spec
                }
            ]
        })
            .then(result => {
                res.status(200).send(result)
            })
            .catch(e => {
                console.log(e)
                res.status(404).send({message: 'Доктор не найден'})
            })
    } catch (e) {
        res.status(500).send({'message': e.message})
    }
})



module.exports = router
