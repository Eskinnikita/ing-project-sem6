<template>
    <div class="approved-list">
        <h2>Заявки врачей</h2>
    </div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('getNotApprovedDoctors')
        }
    }
</script>

<style scoped>

</style>