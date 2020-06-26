const VisitSlot = require('../Models/VisitSlot')
const express = require('express')
const router = express.Router()

router.get('/:id', async (req, res) => {
    try {
        const slots = await VisitSlot.findAll({
            where: {
                doctorId: req.params.id
            }
        })
        if (slots.length) {
            res.status(200).send(slots)
        } else {
            res.status(404).send({'message': 'Слоты не найдены'})
        }
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

module.exports = router
