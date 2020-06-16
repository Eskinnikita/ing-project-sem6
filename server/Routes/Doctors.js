const Doctor = require('../Models/Doctor')
const DoctorSpecs = require('../Models/DoctorSpecs')
const Spec = require('../Models/Spec')
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const sequelize = require('sequelize')
const {Op} = require("sequelize");
const multer  = require('multer')

//files upload config
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/')
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

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
router.post('/', async (req, res) => {
    try {
        const city = req.body.city
        const specId = req.body.specId
        Doctor.belongsToMany(Spec, {through: DoctorSpecs, foreignKey: 'doctorId'})
        Spec.belongsToMany(Doctor, {through: DoctorSpecs, foreignKey: 'specId'})
        const doctors = await Doctor.findAll({
            where: {
                city: city,
                isSearchable: true,
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
                isSearchable: 1
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
router.post('/new-partner', upload.single('photo'), async (req, res) => {
    try {
        await Doctor.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            rating: 0,
            photo: req.file.path,
            phoneNumber: req.body.phoneNumber,
            experience: req.body.experience,
            description: req.body.description,
            clinicAddress: req.body.clinicAddress,
            workType: req.body.workType,
            visitPrice: req.body.visitPrice,
            city: req.body.city,
            isApproved: false,
            isSearchable: false,
            reasonMessage: '',
            role: 2
        })
            .then(result => {
                const specs = JSON.parse(req.body.specs)
                const specsArr = specs.map(el => {
                    return {
                        doctorId: result.dataValues.id,
                        specId: el.id
                    }
                })
                DoctorSpecs.bulkCreate(specsArr).then(() => {
                    res.status(200).send(result)
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
                res.status(404).send({message: 'Доктор не найден'})
            })
    } catch (e) {
        res.status(500).send({'message': e.message})
    }
})

//approve doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).send(doctor)
    } catch (e) {
        console.log(e)
        res.status(500).send({id: req.params.id, 'message': e.message})
    }
})


module.exports = router
