const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./Connection/sequelize')
const cors = require('cors');
const schedule = require('node-schedule');

const app = express();


const PatientsRoutes = require('./Routes/Patients')
const SpecsRoutes = require('./Routes/Specs')
const DoctorsRoutes = require('./Routes/Doctors')
const ReviewsRouters = require('./Routes/Reviews')
const VisitSlotsRoutes = require('./Routes/VisitSlots')
const VisitsRoutes = require('./Routes/Visits')
const DailySchedule = require('./Routes/DoctorDailyScheduleTemplates')

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
app.use('/daily-schedules', DailySchedule)

const VisitSlot = require('./Models/VisitSlot')
const DailyTemplate = require('./Models/DoctorDailyScheduleTemplate')

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const j = schedule.scheduleJob('00 00 00 * * *', async () => {
    try {
        const currentDate = formatDate(new Date())
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 8);
        const VisitSlots = await VisitSlot.findAll({raw: true})
        const DailyTemplates = await DailyTemplate.findAll({raw: true})

        const visitSlotsToDelete = []
        const newVisitSlots = []

        VisitSlots.forEach(el => {
            if (el.visitDate < currentDate && el.isAvailable) {
                visitSlotsToDelete.push(el.id)
            }
        })

        DailyTemplates.forEach(el => {
            newVisitSlots.push({
                doctorId: el.doctorId,
                visitTime: el.availableTime,
                visitDate: formatDate(tomorrowDate),
                isAvailable: true
            })
        })

        await VisitSlot.destroy({
            where: {
                id: visitSlotsToDelete
            }
        })

        await VisitSlot.bulkCreate(newVisitSlots)
    } catch (e) {
        console.log(e)
    }
});


sequelize.sync()
    .then(() => {
        app.listen(8082, function () {
            console.log("Соединение установлено")
        })
    })
    .catch(err => console.log(err));