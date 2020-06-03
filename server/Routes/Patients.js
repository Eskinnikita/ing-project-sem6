const Patient = require('../Models/Patient')
const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        await Patient.findOne({ where: {email: req.body.email, password: req.body.password}})
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => res.status(404).send(err));
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

router.post('/', async (req, res) => {
    try {
        await Patient.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            role: 0
        })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => res.status(404).send(err));
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

module.exports = router
