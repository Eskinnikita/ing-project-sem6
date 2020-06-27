<template>
    <div class="visit-snippet-container">
        <div class="visit-snippet-time">
            <b>{{removeSeconds(visit.visitSlot.visitTime)}}</b>
        </div>
        <div class="visit-snippet">
            <div class="visit-snippet__info">
                Вы записались к: <b>{{visit.doctor.name}}</b> на <b>{{removeSeconds(visit.visitSlot.visitTime)}} {{visit.visitSlot.visitDate | moment("D MMMM")}} {{visit.visitSlot.visitDate | moment("dddd")}}</b>
            </div>
            <div class="visit-snippet__comment">
                Комментарий: {{visit.comment}}
            </div>
            <div class="visit-snippet__controls">
                <button-comp @click.native="cancelVisit" reject>Отменить</button-comp>
            </div>
        </div>
<!--        <confirm-modal>Отменить запись?</confirm-modal>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Button from "../UI/Button"
    export default {
        props: {
            visit: {
                type: Object,
                required: true
            }
        },
        components: {
            'button-comp': Button
        },
        methods: {
            removeSeconds(time) {
                const timeArr = time.split(':')
                return `${timeArr[0]}:${timeArr[1]}`
            },
            cancelVisit() {
                this.$modal.show('confirm-modal')
            }
        },
        computed: {
            ...mapGetters(['isDoctor', 'isPatient'])
        }

    }
</script>

<style lang="scss" scoped>
    .visit-snippet-container {
        height: auto;
        @include flex(flex-start, center, row);
        margin-bottom: 30px;
    }

    .visit-snippet-time {
        font-size: 25px;
        padding: 0 40px 0 0;
    }

    .visit-snippet {
        width: 100%;
        height: 150px;
        background-color: #fff;
        border-radius: $border-radius;
        padding: 20px 30px;
        box-sizing: border-box;

        &__comment {
            margin-top: 20px;
        }

        &__controls {
            margin-top: 20px;
            button {
                margin: 0;
            }
        }
    }
</style>