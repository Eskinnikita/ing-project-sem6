<template>
    <div class="visits">
        <h2 class="visits__title title" v-if="isPatient">Мои записи</h2>
        <h2 class="visits__title title" v-if="isDoctor">Мои пациенты</h2>
        <div class="visits__visits-list" v-if="parsedVisits.length">
            <div class="visits__visit-item" v-for="(day, index) in parsedVisits" :key="index">
                <div class="visits__date">
                    <h2>{{checkToday(day.date) | moment("D MMMM")}}</h2>
                    <hr>
                </div>
                <visit-snippet
                        v-for="(visit, index) in day.visits"
                        :key="index"
                        :visit="visit"
                />
            </div>
        </div>
        <div class="visits__no-visits" v-else>
            <template v-if="isPatient">
                <h3>Похоже, вы еще не записались ни на один прием</h3>
                <router-link to="/">
                    <button-comp>Перейти к поиску?</button-comp>
                </router-link>
            </template>
            <template v-else>
                <h3>Никто еще не записался к вам на прием</h3>
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
                parsedVisits: []
            }
        },
        methods: {
            cancelVisit() {
                this.$store.dispatch('cancelVisit')
                    .then(() => {
                        this.removeVisit()
                        this.$modal.hide('confirm-modal')
                    })
            },
            removeVisit() {
                const visitToRemove = this.VisitsStore.visitToCancel
                const dayWithVisit = this.parsedVisits.find(el => el.date === visitToRemove.visitDate)
                const visitInDayIndex = dayWithVisit.visits.findIndex(el => el.id === visitToRemove.id)
                dayWithVisit.visits.splice(visitInDayIndex, 1)
                if (!dayWithVisit.visits.length) {
                    const emptyDayIndex = this.parsedVisits.findIndex(el => el.date === dayWithVisit.date)
                    this.parsedVisits.splice(emptyDayIndex, 1)
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
                this.parsedVisits.forEach(el => {
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
            margin-bottom: 40px;
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
</style>