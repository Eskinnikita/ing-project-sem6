const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./Connection/sequelize')
const cors = require('cors')

const app = express();

const PatientsRoutes = require('./Routes/Patients')
const SpecsRoutes = require('./Routes/Specs')
const DoctorsRoutes = require('./Routes/Doctors')
const ReviewsRouters = require('./Routes/Reviews')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/patients', PatientsRoutes)
app.use('/specializations', SpecsRoutes)
app.use('/doctors', DoctorsRoutes)
app.use('/reviews', ReviewsRouters)


sequelize.sync()
    .then(() => {
        app.listen(8082, function () {
            console.log("Соединение установлено")
        })
    })
    .catch(err => console.log(err));