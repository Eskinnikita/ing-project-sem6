const Spec = require('../Models/Spec')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        await Spec.findAll()
            .then(data => {
                res.status(200).send(data.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }))
            })
            .catch(err => res.status(404).send(err));
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

module.exports = router
