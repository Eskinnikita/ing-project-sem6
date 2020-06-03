<template>
    <div class="not-found">
        <h1 class="not-found__title">
            404. мы не нашли такую страницу.
        </h1>
        <span class="not-found__home-link">Вы можете вернуться на <router-link to="/">главную</router-link></span>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .not-found {
       &__title {
           margin: 40px 0 20px 0;
       }
    }
</style>