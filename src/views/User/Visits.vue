<template>
    <div class="visits">
        <h2 class="title" v-if="isPatient">Мои записи</h2>
        <h2 class="title" v-if="isDoctor">Мои пациенты</h2>
        <div class="visits__visits-list">
            <visit-snippet
                    v-for="index in 3"
                    :key="index"
            />
        </div>
    </div>
</template>

<script>
    import VisitSnippet from "../../components/User/VisitSnippet"
    import {mapGetters} from 'vuex'
    export default {
        components: {
            'visit-snippet': VisitSnippet
        },
        computed: {
            ...mapGetters(['isDoctor', 'isPatient'])
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