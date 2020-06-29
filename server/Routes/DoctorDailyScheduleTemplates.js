const DailySchedule = require('../Models/DoctorDailyScheduleTemplate')
const VisitSlot = require('../Models/VisitSlot')
const express = require('express')
const router = express.Router()

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

router.post('/', async (req, res) => {
    try {
        const ScheduleTemplateItems = req.body
        const doctorId = ScheduleTemplateItems[0].doctorId
        await DailySchedule.destroy({
            where: {
                doctorId: ScheduleTemplateItems[0].doctorId
            }
        })
        await DailySchedule.bulkCreate(ScheduleTemplateItems)
        const visitSlots = []
        const visitSlotDate = new Date();
        for(let i = 0; i < 9; i++) {
            ScheduleTemplateItems.forEach(el => {
                visitSlots.push({
                    doctorId: doctorId,
                    visitTime: el.availableTime,
                    visitDate: formatDate(visitSlotDate),
                    isAvailable: true
                })
            })
            visitSlotDate.setDate(visitSlotDate.getDate() + 1);
        }
        await VisitSlot.destroy(
            {
                where: {
                    doctorId: doctorId
                }
            }
        )
        await VisitSlot.bulkCreate(visitSlots)
        res.status(200).send({'message': 'Расписание успешно обновлено'})
    } catch (e) {
        res.status(500).send({'message': 'Ошибка сервера'})
    }
})

module.exports = router