<template>
    <div class="work-filter">
        <button
                @click="setWorkType(type)"
                :class="checkActive(type.id) ? 'work-filter__button work-filter__button_active' : 'work-filter__button'"
                v-for="(type, index) in workTypes"
                :key="index"
        >
            {{type.text}}
        </button>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'click'
        },
        created() {
            this.$emit("click", this.workTypes[0])
        },
        data() {
            return {
                selectedType: {
                    id: 0,
                    text: 'Все',
                    workType: 0
                },
                workTypes: [
                    {
                        id: 0,
                        text: 'Все',
                        workType: 0
                    },
                    {
                        id: 1,
                        text: 'В клинике',
                        workType: 1
                    },
                    {
                        id: 2,
                        text: 'Онлайн',
                        workType: 2
                    },
                    {
                        id: 3,
                        text: 'На дому',
                        workType: 3
                    }
                ]
            }
        },
        methods: {
            setWorkType(type) {
                this.selectedType = type
                this.$emit("click", type)
            },
            checkActive(typeId) {
                return this.selectedType.id === typeId
            }
        },
        computed: {

        }
    }
</script>

<style lang="scss" scoped>
    .work-filter {
        &__button {
            @include pinkControls;
        }
    }
</style>