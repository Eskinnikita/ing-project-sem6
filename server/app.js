const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./Connection/sequelize')
const cors = require('cors')

const app = express();

const PatientsRoutes = require('./Routes/Patients')
const SpecsRoutes = require('./Routes/Specs')
const DoctorsRoutes = require('./Routes/Doctors')
const ReviewsRouters = require('./Routes/Reviews')
const VisitSlotsRoutes = require('./Routes/VisitSlots')
const VisitsRoutes = require('./Routes/Visits')

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
app.use('/visit-slots', VisitSlotsRoutes)
app.use('/visits', VisitsRoutes)



sequelize.sync()
    .then(() => {
        app.listen(8082, function () {
            console.log("Соединение установлено")
        })
    })
    .catch(err => console.log(err));