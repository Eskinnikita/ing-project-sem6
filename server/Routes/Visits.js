const Visit = require('../Models/Visit')
const VisitSlot = require('../Models/VisitSlot')
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
        VisitSlot.hasOne(Visit, {foreignKey: 'slotId'})
        Visit.belongsTo(VisitSlot, {foreignKey: 'id'})
        const id = +req.body.id
        const role = +req.body.role
        let visits = null
        if (role === 2) {
            console.log('БЛЯТЬ')
            visits = await Visit.findAll({
                where: {
                    doctorId: id
                },
                include: [
                    {
                        model: VisitSlot
                    }
                ]
            })
        } else if (role === 1) {
            console.log('СУКА')
            visits = await Visit.findAll({
                where: {
                    patientId: id
                },
                include: [
                    {
                        model: VisitSlot
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
