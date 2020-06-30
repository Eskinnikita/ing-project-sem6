const express = require('express')
const router = express.Router()
const Review = require('../Models/Review')

router.post('/', async (req, res) => {
    try {
        await Review.create({
            doctorId: req.body.doctorId,
            patientId: req.body.patientId,
            reviewerName: req.body.reviewerName,
            text: req.body.text,
            publicationDate: req.body.publicationDate,
            rating: req.body.rating,
            isApproved: req.body.isApproved,
            isDisplayed: req.body.isDisplayed,
        })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(404).send(err)
            });
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

router.get('/not-approved', async (req, res) => {
    try {
        await Review.findAll({
            where: {
                isApproved: false
            },
            order: [
                ['publicationDate', 'DESC']
            ]
        })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(404).send(err)
            });
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const doctor = await Review.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).send(doctor)
    } catch (e) {
        res.status(500).send({id: req.params.id, 'message': e.message})
    }
})

module.exports = router
