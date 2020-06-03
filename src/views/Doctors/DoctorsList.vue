<template>
    <div class="search-results">
        <div class="search-results__search">
            <doctors-search :city-prop="city" :doctor-prop="doctor"/>
        </div>
        <div class="search-results__title">
            <h2 v-if="doctor.value">Врач {{doctor.value.toLowerCase()}} в городе {{city.value}} <span class="gray-text">• 10</span></h2>
            <h2 v-else>Врачи в городе {{city.value}} <span class="gray-text">• 10</span></h2>
        </div>
        <div class="doctors-list">
            <doctor-snippet v-for="index in 10" :key="index"/>
        </div>
    </div>
</template>

<script>
    import Search from "../../components/Search"
    import DoctorSnippet from "../../components/DoctorSnippet"

    export default {
        components: {
            'doctors-search': Search,
            'doctor-snippet': DoctorSnippet
        },
        created() {
            this.city = {value: this.$route.params.city, text: this.$route.params.city}
            this.doctor = {value: this.$route.params.spec, text: this.$route.params.spec}
        },
        data() {
            return {
                city: null,
                doctor: null
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
    }

    .doctors-list {
        padding-top: 30px;
    }

    .gray-text {
        color: #abaaaa;
    }
</style>