<template>
    <div class="visits">
        <h2 class="title" v-if="isPatient">Мои записи</h2>
        <h2 class="title" v-if="isDoctor">Мои пациенты</h2>
        <div class="visits__visits-list">
            <visit-snippet
                    v-for="(visit, index) in VisitsStore.visits"
                    :key="index"
                    :visit="visit"
            />
        </div>
    </div>
</template>

<script>
    import VisitSnippet from "../../components/User/VisitSnippet"
    import {mapGetters} from 'vuex'
    import {mapState} from 'vuex'
    export default {
        components: {
            'visit-snippet': VisitSnippet
        },
        mounted() {
            if(this.user) {
                this.$store.dispatch('getUserVisits', {id: this.user.id, role: this.user.role})
            }
        },
        computed: {
            ...mapGetters(['isDoctor', 'isPatient']),
            ...mapState(['user', 'VisitsStore'])
        }
    }
</script>

<style lang="scss" scoped>
    .visits {
        &__visits-list {
            margin-top: 20px;
        }
    }
</style>