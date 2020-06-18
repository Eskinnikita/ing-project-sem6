<template>
    <div class="search-results">
        <div class="search-results__search">
            <doctors-search :city-prop="city" :doctor-prop="doctor"/>
        </div>
        <div class="search-results__title" v-if="doctorsCount">
            <h2 v-if="doctor.value">Врач {{doctor.value.toLowerCase()}} в городе {{city.value}} <span class="gray-text">• {{doctorsCount}}</span></h2>
            <h2 v-else>Врачи в городе {{city.value}} <span class="gray-text">• {{doctorsCount}}</span></h2>
        </div>
        <div class="doctors-list" v-if="doctorsCount">
            <doctor-snippet v-for="(doctor, index) in DoctorsStore.doctors" :doctor="doctor" :key="index"/>
        </div>
        <div v-if="!doctorsCount" class="search-results__not-found">
            <h2>К сожалению, мы ничего не нашли ;(</h2>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Search from "../../components/Search"
    import DoctorSnippet from "../../components/DoctorSnippet"

    export default {
        components: {
            'doctors-search': Search,
            'doctor-snippet': DoctorSnippet
        },
        created() {
            this.city = {value: this.$route.params.city, text: this.$route.params.city}
            this.doctor = {value: this.$route.params.specId, text: this.$route.params.specId}
        },
        data() {
            return {
                city: null,
                doctor: null
            }
        },
        computed: {
            ...mapState(['DoctorsStore']),
            doctorsCount() {
                return this.DoctorsStore.doctors.length
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-results {
        &__search {
            padding-top: 10px;
        }

        &__title {
            padding-top: 30px;
        }

        &__not-found {
            margin: 40px 0 20px 0;
        }
    }

    .doctors-list {
        padding-top: 30px;
    }
</style>