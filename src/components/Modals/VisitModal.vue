<template>
    <modal class="visit-modal" style="{'border-radius': 5px}" height="600" width="400" name="visit-modal">
        <div class="modal-container">
            <h2 class="visit-modal__title title">Запись на приём</h2>
            <input-comp label="Ваше имя:" v-model="visit.patientName"/>
            <input-comp label="Номер телефона:" v-model="visit.phoneNumber"/>
            <div class="input-wrapper">
                <label for="comment">Комментарий к записи:</label>
                <textarea v-model="visit.comment" style="height: 150px;" placeholder="Текст комментария" id="comment"/>
            </div>
            <div class="visit-modal__visit-day visit-day">
                <span class="visit-day__title">Запись на: </span>
                <span class="visit-day__date-time">{{ visitSlot.visitTime }}
                {{visitSlot.visitDate | moment("D MMMM")}}
                {{visitSlot.visitDate | moment("dddd")}}</span>
            </div>
            <button-comp width="100%" @click.native="addVisit">Записаться</button-comp>
        </div>
    </modal>
</template>

<script>
    import {mapState} from 'vuex'
    import Button from "../UI/Button"
    import Input from "../UI/Input"

    export default {
        props: {
            visitSlot: {
                type: Object,
                required: true
            },
            doctorId: {
                type: Number,
                required: true
            }
        },
        components: {
            'button-comp': Button,
            'input-comp': Input
        },
        mounted() {
            this.visit.patientName += this.user.name
            this.visit.phoneNumber += this.user.phoneNumber ? this.user.phoneNumber : ''
        },
        data() {
            return {
                visit: {
                    doctorId: null,
                    patientId: null,
                    patientName: '',
                    phoneNumber: '+7',
                    comment: '',
                    slot: null
                }
            }
        },
        methods: {
            addVisit() {
                this.visit.doctorId = this.doctorId
                this.visit.patientId = this.user.id
                this.visit.slot = this.visitSlot
                this.visit.slot.isAvailable = false
                this.$store.dispatch('addVisit', this.visit)
                    .then(() => {
                        this.$modal.hide('visit-modal')
                    })
            }
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .visit-modal {
        &__title {
            margin-bottom: 30px;
        }

        &__visit-day {

        }
    }

    .modal-container {
        @include modalContainer;
    }

    .visit-day {
        width: 100%;
        text-align: left;
        padding: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
        font-size: 15px;
        border-radius: $border-radius;
        border: 1px solid $accent-blue-color;

        &__title {

        }

        &__date-time {
            font-weight: 600;
        }
    }
</style>