<template>
    <div class="approved-list">
        <h2 class="approved-list__title">Заявки врачей</h2>
        <template v-if="notApprovedDoctors.length">
            <doctor-snippet v-for="(doctor, index) in notApprovedDoctors" :key="index" :doctor="doctor"/>
        </template>
        <h3 style="font-weight: normal" v-else >На данный момент нет ни одной заявки</h3>
    </div>
</template>

<script>
    import DoctorSnippet from "../../components/DoctorSnippet"
    import {mapState} from 'vuex'
    export default {
        components: {
            'doctor-snippet': DoctorSnippet
        },
        created() {
            this.$store.dispatch('getNotApprovedDoctors')
        },
        computed: {
            ...mapState(['DoctorsStore']),
            notApprovedDoctors() {
                return this.DoctorsStore.notApprovedDoctors
            }
        }
    }
</script>

<style lang="scss" scoped>
    .approved-list {
        &__title {
            margin-bottom: 20px;
        }
    }
</style>