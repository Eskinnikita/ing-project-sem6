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

module.exports = router
