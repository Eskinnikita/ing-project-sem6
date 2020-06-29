<template>
    <div class="schedule-edit">
        <h2>Редактирование расписания</h2>
        <div class="schedule-edit__working-days">
            <h3 class="schedule-edit__title title">Выберите рабочие дни</h3>
            <button
                    class="schedule-edit__day"
                    :class="checkActive(day) ? 'schedule-edit__day schedule-edit__day_active' : 'schedule-edit__day' "
                    @click="toggleDay(day)"
                    v-for="(day, index) in days"
                    :key="index">
                {{day.name}}
            </button>
        </div>
        <div class="schedule-edit__day-start">
            <h3 class="schedule-edit__title title">Выберите начало рабочего дня</h3>
            <model-select v-model="dayStart" placeholder="Начало рабочего дня" :options="multiselectTime"/>
        </div>
        <div class="schedule-edit__day-end">
            <h3 class="schedule-edit__title title">Выберите конец рабочего дня</h3>
            <model-select v-model="dayEnd" placeholder="Конец рабочего дня" :options="multiselectTime"/>
        </div>
        <div class="schedule-edit__controls">
            <button-comp @click.native="openConfirmModal" width="100%">Сохранить изменения</button-comp>
            <button @click="goToDoctorView" class="schedule-edit__cancel-button">Отменить</button>
        </div>
        <confirm-modal :submit-method="saveSchedule">Подтвердить изменение расписания?</confirm-modal>
    </div>
</template>

<script>
    import {ModelSelect} from "vue-search-select"
    import Button from "../../components/UI/Button"
    import {mapState} from 'vuex'
    import ConfirmModal from "../../components/Modals/ConfirmModal"

    export default {
        components: {
            ConfirmModal,
            'model-select': ModelSelect,
            'button-comp': Button
        },
        created() {
            this.createTime()
            if(this.user.workingDays) {
                this.parseDoctorSchedule()
            }
        },
        methods: {
            parseDoctorSchedule() {
                const daysArr = this.user.workingDays.split(',')
                daysArr.forEach(el => {
                    const dayFromActiveDays = this.days.find(day => day.id === +el)
                    this.activeDays.push(dayFromActiveDays)
                })
            },
            prepareDailyTemplates() {
                console.log(this.dayStart, this.dayEnd)
                const dayStartIndex = this.workingTime.findIndex(el => el === this.dayStart)
                const dayEndIndex = this.workingTime.findIndex(el => el === this.dayEnd)
                const workingTimeCopy = JSON.parse(JSON.stringify(this.workingTime))
                const workingHours = workingTimeCopy.splice(dayStartIndex, dayEndIndex - dayStartIndex + 1)
                return workingHours.map(el => {
                    return {
                        doctorId: this.user.id,
                        availableTime: el
                    }
                })
            },
            saveSchedule() {
                const doctorDailyScheduleTemplate = this.prepareDailyTemplates()
                const workingDaysString = this.prepareDays()
                this.$store.commit('SET_WORKING_DAYS', workingDaysString)
                this.$store.dispatch('addDailySchedule',  doctorDailyScheduleTemplate)
                this.$store.dispatch('updateDoctor', {
                    id: this.user.id,
                    workingDays: workingDaysString
                })
                .then(() => {
                    this.$modal.hide('confirm-modal')
                })
            },
            openConfirmModal() {
                this.$modal.show('confirm-modal')
            },
            goToDoctorView() {
                this.$router.push(`/doctor/${this.user.id}`)
            },
            prepareDays() {
                let days = ''
                this.activeDays.forEach(el => {
                    const dayIndex = this.activeDays.findIndex(day =>  day.id === el.id)
                    days += dayIndex === this.activeDays.length - 1 ? `${el.id}` : `${el.id},`
                })
                return days
            },
            toggleDay(day) {
                const dayIndex = this.activeDays.findIndex(el => el.id === day.id)
                if (dayIndex > -1) {
                    this.activeDays.splice(dayIndex, 1)
                } else {
                    this.activeDays.push(day)
                }
            },
            checkActive(day) {
                const dayIndex = this.activeDays.findIndex(el => el.id === day.id)
                return dayIndex > -1
            },
            createTime() {
                for (let i = 0; i < 24; i++) {
                    const time = `${i}`.length > 1 ? `${i}:00:00` : `0${i}:00:00`
                    this.workingTime.push(time)
                }
            }
        },
        computed: {
            ...mapState(['user']),
            multiselectTime() {
                return this.workingTime.map(el => {
                    return {
                        text: el,
                        value: el
                    }
                })
            }
        },
        data() {
            return {
                dayStart: '',
                dayEnd: '',
                days: [
                    {
                        id: 1,
                        name: 'Понедельник'
                    },
                    {
                        id: 2,
                        name: 'Вторник'
                    },
                    {
                        id: 3,
                        name: 'Среда'
                    },
                    {
                        id: 4,
                        name: 'Четверг'
                    },
                    {
                        id: 5,
                        name: 'Пятница'
                    },
                    {
                        id: 6,
                        name: 'Суббота'
                    },
                    {
                        id: 0,
                        name: 'Воскресенье'
                    }
                ],
                activeDays: [],
                workingTime: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    .schedule-edit {
        &__title {
            font-weight: normal;
        }

        &__working-days {
            margin-top: 25px;
        }

        &__day-start {
            margin-top: 20px;
        }

        &__day-end {
            margin-top: 20px;
        }

        &__cancel-button {
            display: block;
            margin-top: 15px !important;
            background: none;
            border: none;
            cursor: pointer;
            color: $accent-pink-color;
            font-size: 13px;
            &:hover {
                text-decoration: underline;
            }
        }

        &__controls {
            @include flex(center, center, column);
            button {
                margin: 0;
            }
            margin-top: 50px;
        }

        &__day {
            font-size: 13px;
            width: 110px;
            padding: 10px;
            border-radius: $border-radius;
            background: $accent-blue-color;
            border: 1px solid $accent-blue-color;
            margin-right: 10px;
            color: #fff;
            cursor: pointer;
            opacity: 0.4;

            &_active {
                opacity: 1;
            }
        }
    }
</style>