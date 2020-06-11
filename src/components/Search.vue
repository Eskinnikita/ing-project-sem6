<template>
    <div class="doctors-search">
        <div class="doctors-search__select">
            <model-select v-model="doctor" placeholder="Врач" :options="doctors"/>
        </div>
        <div class="doctors-search__select">
            <model-select v-model="city" placeholder="Город" :options="cities"/>
        </div>
        <button-comp :isDisabled="isDisabled" @click.native="findDoctors">Найти</button-comp>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import Button from "../components/UI/Button"
    import {ModelSelect} from 'vue-search-select'
    import citiesJson from "../json/cities.json"

    export default {
        props: {
            cityProp: {
                type: Object,
                default: null
            },
            doctorProp: {
                type: Object,
                default: null
            }
        },
        components: {
            'button-comp': Button,
            'model-select': ModelSelect
        },
        created() {
            this.$store.dispatch('getAllSpecs')
            if (this.cityProp) this.city = this.cityProp
            if (this.doctorProp) this.doctor = this.doctorProp
            this.cities = citiesJson.map(el => {
                return {
                    text: el.name,
                    value: el.name
                }
            })
        },
        data() {
            return {
                cities: null,
                doctor: {
                    value: '',
                    text: ''
                },
                city: {
                    value: '',
                    text: ''
                }
            }
        },
        methods: {
            findDoctors() {
                this.$store.dispatch('findDoctorsBySpecAndCity', {
                    city: this.city.value,
                    specId: this.doctor.id
                })
                this.$router.push(`/doctors/${this.city.value}/${this.doctor.value}`)
            }
        },
        computed: {
            ...mapState(['SpecsStore']),
            isDisabled() {
                return this.city.value === '' || this.doctor.value === ''
            },
            doctors() {
                return this.SpecsStore.specs.map(el => {
                    return {
                        id: el.id,
                        value: el.name,
                        text: el.name
                    }
                })
            }
        },
        watch: {
            city: {
                deep: true,
                handler() {
                    if (!this.city.value) this.city.value = ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .doctors-search {
        width: 100%;
        @include flex(center, center, row);

        &__select {
            width: 100%;
            padding: 0 10px;

            &:first-child {
                padding-left: 0;
            }
        }
    }
</style>