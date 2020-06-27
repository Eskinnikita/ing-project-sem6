const Visit = require('../Models/Visit')
const VisitSlot = require('../Models/VisitSlot')
const Doctor = require('../Models/Doctor')
const Spec = require('../Models/Spec')
const DoctorSpecs = require('../Models/DoctorSpecs')
const Patient = require('../Models/Patient')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        await Visit.create({
            doctorId: req.body.doctorId,
            patientId: req.body.patientId,
            patientName: req.body.patientName,
            phoneNumber: req.body.phoneNumber,
            comment: req.body.comment,
            slotId: req.body.slot.id,
        })

        await VisitSlot.update(
            req.body.slot,
            {
                where: {
                    id: req.body.slot.id
                }
            }
        )
        res.status(200).send({'message': 'Вы успешно записались!'})
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

router.post('/all-visits', async (req, res) => {
    try {
        Doctor.hasMany(Visit, {foreignKey: 'id'})
        Visit.belongsTo(Doctor, {foreignKey: 'doctorId'})

        Patient.hasMany(Visit, {foreignKey: 'id'})
        Visit.belongsTo(Patient, {foreignKey: 'patientId'})

        Doctor.belongsToMany(Spec, {through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, {through: DoctorSpecs, foreignKey: 'specId'})

        VisitSlot.hasOne(Visit, {foreignKey: 'id'})
        Visit.belongsTo(VisitSlot, {foreignKey: 'slotId'})

        const id = +req.body.id
        const role = +req.body.role
        let visits = null
        if (role === 2) {
            visits = await Visit.findAll({
                where: {
                    doctorId: id
                },
                include: [
                    {
                        model: VisitSlot,
                        attributes: ['visitTime', 'visitDate']
                    },
                    {
                        model: Patient,
                        attributes: ['name']
                    },
                    {
                        model: Doctor,
                        attributes: ['name'],
                        include: [
                            {
                                model: Spec,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            })
        } else if (role === 1) {
            visits = await Visit.findAll({
                where: {
                    patientId: id
                },
                include: [
                    {
                        model: VisitSlot,
                        attributes: ['visitTime', 'visitDate']
                    },
                    {
                        model: Patient,
                        attributes: ['name']
                    },
                    {
                        model: Doctor,
                        attributes: ['name'],
                        include: [
                            {
                                model: Spec,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            })
        }
        res.status(200).send(visits)
    } catch (e) {
        console.log(e)
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})


module.exports = router
