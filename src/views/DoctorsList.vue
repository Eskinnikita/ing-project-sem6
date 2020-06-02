<template>
    <div class="search-results">
        <div class="search-results__search">
            <doctors-search :city-prop="city" :doctor-prop="doctor"/>
        </div>
        <div class="search-results__title">
            <h2 v-if="doctor.value">Врач {{doctor.value.toLowerCase()}} в городе {{city.value}}</h2>
            <h2 v-else>Врачи в городе {{city.value}}</h2>
        </div>
    </div>
</template>

<script>
    import Search from "../components/Search"

    export default {
        components: {
            'doctors-search': Search
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
            padding-top: 30px;
        }

        &__title {
            padding-top: 30px;
        }
    }
</style>