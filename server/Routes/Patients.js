const Patient = require('../Models/Patient')
const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        await Patient.findOne({ where: {email: req.body.email, password: req.body.password}})
            .then(data => {
                if(data === null) {
                    res.status(404).send({'message': 'Ошибка входа!'})
                }
                else {
                    res.status(200).send(data)
                }
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
            role: 1
        })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => res.status(404).send(err));
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        await Patient.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.status(200).send(result)
            })
            .catch(e => {
                res.status(404).send({message: 'Доктор не найден'})
            })
    } catch (e) {
        res.status(500).send({'message': e.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).send(patient)
    } catch (e) {
        res.status(500).send({id: req.params.id, 'message': e.message})
    }
})

module.exports = router
