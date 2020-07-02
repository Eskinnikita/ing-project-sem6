<template>
    <div class="visits">
        <h2 class="visits__title title" v-if="isPatient">Мои записи</h2>
        <h2 class="visits__title title" v-if="isDoctor">Мои пациенты</h2>
        <div class="visits__list-controls list-controls">
            <button
                    :class="!showHistory ?  'list-controls__button list-controls__button_active' : 'list-controls__button'"
                    @click="toggleList(false)">Активные
            </button>
            <button
                    :class="showHistory ? 'list-controls__button list-controls__button_active' : 'list-controls__button'"
                    @click="toggleList(true)">История
            </button>
        </div>
        <div class="visits__visits-list">
            <template v-if="activeVisits.length && !showHistory">
                <div class="visits__visit-item" v-for="(day, index) in activeVisits" :key="index">
                    <div class="visits__date">
                        <h2>{{checkToday(day.date) | moment("D MMMM")}}</h2>
                        <hr>
                    </div>
                    <visit-snippet
                            v-for="(visit, index) in day.visits"
                            :key="index"
                            :visit="visit"
                            :show-cancel-button="true"
                    />
                </div>
            </template>
            <template v-if="historyVisits.length && showHistory">
                <div class="visits__visit-item" v-for="(day, index) in historyVisits" :key="index">
                    <div class="visits__date">
                        <h2>{{checkToday(day.date) | moment("D MMMM")}}</h2>
                        <hr>
                    </div>
                    <visit-snippet
                            v-for="(visit, index) in day.visits"
                            :key="index"
                            :visit="visit"
                            :show-cancel-button="false"
                    />
                </div>
            </template>
        </div>
        <div class="visits__no-visits">
            <template v-if="(isDoctor || isPatient) && !activeVisits.length && !showHistory">
                <h3 v-if="isPatient">Похоже, у вас еще нет записей</h3>
                <h3 v-if="isDoctor">Похоже, к вам еще никто не записывался</h3>
                <router-link v-if="isPatient" to="/">
                    <button-comp>Перейти к поиску?</button-comp>
                </router-link>
            </template>
            <template v-if="(isDoctor || isPatient) && !historyVisits.length && showHistory">
                <h3>История пока что пустует</h3>
            </template>
        </div>
        <confirm-modal :submit-method="cancelVisit">Отменить запись?</confirm-modal>
    </div>
</template>

<script>
    import VisitSnippet from "../../components/User/VisitSnippet"
    import {mapGetters} from 'vuex'
    import {mapState} from 'vuex'
    import ConfirmModal from "../../components/Modals/ConfirmModal"
    import Button from "../../components/UI/Button"

    export default {
        components: {
            'visit-snippet': VisitSnippet,
            'confirm-modal': ConfirmModal,
            'button-comp': Button
        },
        mounted() {
            this.$store.dispatch('getUserVisits', {id: this.user.id, role: this.user.role})
                .then(() => {
                    this.parseVisits()
                })
        },
        data() {
            return {
                showHistory: false,
                parsedVisits: [],
                historyVisits: [],
                activeVisits: []
            }
        },
        methods: {
            toggleList(status) {
                this.showHistory = status
            },
            cancelVisit() {
                this.$store.dispatch('cancelVisit')
                    .then(() => {
                        this.removeVisit()
                        this.$modal.hide('confirm-modal')
                        this.$store.commit('SET_EMPTY_VISIT_TO_CANCEL')
                    })
            },
            removeVisit() {
                const visitToRemove = this.VisitsStore.visitToCancel
                const dayWithVisit = this.activeVisits.find(el => el.date === visitToRemove.visitDate)
                const visitInDayIndex = dayWithVisit.visits.findIndex(el => el.id === visitToRemove.visitId)
                dayWithVisit.visits.splice(visitInDayIndex, 1)
                if (!dayWithVisit.visits.length) {
                    const emptyDayIndex = this.activeVisits.findIndex(el => el.date === dayWithVisit.date)
                    this.activeVisits.splice(emptyDayIndex, 1)
                }
            },
            checkToday(day) {
                const currentDate = this.$moment(new Date()).format("YYYY-MM-DD");
                return currentDate === day ? 'Сегодня' : day
            },
            parseVisits() {
                this.VisitsStore.visits.forEach(visit => {
                    if (this.parsedVisits.length === 0) {
                        this.parsedVisits.push({
                            date: visit.visitSlot.visitDate,
                            visits: [visit]
                        })
                    } else {
                        let existingDate = this.parsedVisits.find(el => el.date === visit.visitSlot.visitDate)
                        if (existingDate) {
                            existingDate.visits.push(visit)
                        } else {
                            this.parsedVisits.push({
                                date: visit.visitSlot.visitDate,
                                visits: [visit]
                            })
                        }
                    }
                })
                const currentDate = this.$moment(new Date()).format("YYYY-MM-DD");
                this.parsedVisits.forEach(el => {
                    if (el.date >= currentDate) {
                        this.activeVisits.push(el)
                    } else {
                        this.historyVisits.push(el)
                    }
                })
                this.activeVisits.forEach(el => {
                    el.visits.sort(this.compare)
                })
                this.historyVisits.forEach(el => {
                    el.visits.sort(this.compare)
                })
            },
            compare(a, b) {
                if (a.visitSlot.visitTime < b.visitSlot.visitTime) {
                    return -1;
                }
                if (a.visitSlot.visitTime > b.visitSlot.visitTime) {
                    return 1;
                }
                return 0;
            }
        },
        computed: {
            ...
                mapGetters(['isDoctor', 'isPatient']),
            ...
                mapState(['user', 'VisitsStore'])
        }
    }
</script>

<style lang="scss" scoped>
    .visits {
        &__no-visits {
            text-align: center;

            h3 {
                font-weight: normal;
            }

            button {
                margin-top: 20px;
            }
        }

        &__title {
            text-align: center;
            margin-bottom: 20px;
        }

        &__visits-list {
            margin-top: 20px;
        }

        &__visit-item {
            margin-bottom: 100px;
        }

        &__date {
            @include flex(space-between, center, row);
            margin-bottom: 20px;

            h2 {
                padding-right: 10px;
                min-width: 170px;
            }

            hr {
                width: 100%;
                color: rgba(0, 0, 0, 0.4);
            }
        }
    }

    .list-controls {
        margin-bottom: 30px;
        @include flex(center, center, row);

        &__button {
            @include pinkControls;
        }
    }
</style>