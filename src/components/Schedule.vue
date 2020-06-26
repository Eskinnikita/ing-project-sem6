<template>
    <div class="schedule">
        <div class="schedule__cols">
            <div class="schedule__col"
                 v-for="(day, index) in doctorSchedule"
                 :key="index"
                 :style="{'display': index <= shownIndex && (index > (shownIndex - limit)) ? 'block' : 'none'}"
            >
                <div class="schedule__days days">
                    <button class="days__button">{{day.date | moment('dddd')}},<br>{{day.date | moment("D MMMM")}}
                    </button>
                </div>
                <div class="schedule__hours hours">
                    <button
                            @click="openVisitModal(hour)"
                            class="hours__button"
                            :disabled="checkHour(day.date, hour.visitTime, hour.isAvailable)"
                            v-for="(hour, index) in day.hours"
                            :key="index"
                    >
                        {{removeSeconds(hour.visitTime)}}
                    </button>
                </div>
            </div>
        </div>
        <div class="schedule__controls">
            <button :disabled="shownIndex === 2" @click="goToPrevDays">
                <font-awesome-icon :icon="['fas', 'arrow-left']"/>
            </button>
            <button :disabled="shownIndex > doctorSchedule.length" @click="goToNextDays">
                <font-awesome-icon :icon="['fas', 'arrow-right']"/>
            </button>
        </div>
        <visit-modal v-if="visitSlot" :visit-slot="visitSlot" :doctor-id="doctorId"/>
    </div>
</template>

<script>
    import VisitModal from "./Modals/VisitModal"

    export default {
        props: {
            schedule: {
                type: Array,
                required: true
            },
            doctorId: {
                type: Number,
                required: true
            }
        },
        components: {
            'visit-modal': VisitModal
        },
        created() {
            if (this.schedule.length) {
                this.parseSchedule()
            }
        },
        data() {
            return {
                doctorSchedule: [],
                visitSlot: {},
                shownIndex: 2,
                limit: 3
            }
        },
        methods: {
            openVisitModal(slot) {
                this.visitSlot = slot
                this.$modal.show('visit-modal')
            },
            parseSchedule() {
                this.schedule.forEach(slot => {
                    if (this.doctorSchedule.length === 0) {
                        this.doctorSchedule.push({
                            date: slot.visitDate,
                            hours: [slot]
                        })
                    } else {
                        let existingDate = this.doctorSchedule.find(el => el.date === slot.visitDate)
                        if (existingDate) {
                            existingDate.hours.push(slot)
                        } else {
                            this.doctorSchedule.push({
                                date: slot.visitDate,
                                hours: [slot]
                            })
                        }
                    }
                })
            },
            removeSeconds(time) {
                const timeArr = time.split(':')
                return `${timeArr[0]}:${timeArr[1]}`
            },
            checkHour(date, time, isAvailable) {
                const currentDate = this.$moment(new Date()).format("YYYY-MM-DD");
                let currentTime = this.$moment(new Date()).format("HH:mm:ss");
                return date === currentDate && time < currentTime || !isAvailable
            },
            goToNextDays() {
                this.shownIndex += this.limit
            },
            goToPrevDays() {
                this.shownIndex -= this.limit
            }
        },
    }
</script>

<style lang="scss" scoped>
    .schedule {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        min-width: 390px;

        &__cols {
            @include flex(flex-start, flex-start, row);
        }

        &__col {
            padding: 0 10px;
            width: 33.3%;
            box-sizing: border-box;
        }

        &__controls {
            padding-top: 10px;
            width: 100%;
            @include flex(space-between, center, row);

            button {
                cursor: pointer;
                border: none;
                background: none;
                font-size: 30px;
                color: $accent-blue-color;
                transition: transform 0.3s;

                &:hover {
                    transform: scale(1.1);
                }

                &:disabled, &[disabled] {
                    opacity: 0.4;
                    cursor: default;
                }
            }
        }
    }

    .days {
        @include flex(space-between, center, row);
        margin-bottom: 20px;

        &__button {
            width: 100%;
            border: 1px solid $border-color;
            border-radius: $border-radius;
            background-color: #fff;
            padding: 5px;
            margin: 0 10px;
            /*cursor: pointer;*/
            font-size: 13px;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .hours {
        @include flex(flex-start, center, column);
        padding-bottom: 10px;

        &__button {
            cursor: pointer;
            border-radius: $border-radius;
            background-color: $accent-blue-color;
            border: none;
            color: #fff;
            padding: 10px 10px;
            font-size: 14px;
            width: 100%;
            margin-bottom: 10px;

            &:disabled, &[disabled] {
                opacity: 0.4;
                cursor: default;
            }
        }
    }
</style>