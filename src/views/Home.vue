<template>
    <div class="home">
        <h1 class="home__title">
            Выберите врача <br> и запишитесь на приём!
        </h1>
        <div class="home__doctors-search">
            <doctors-search/>
        </div>
    </div>
</template>

<script>
    import Search from "../components/Search"

    export default {
        components: {
            'doctors-search': Search
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        &__title {
            padding-top: 80px;
            width: 100%;
            display: block;
            text-align: center;
        }

        &__doctors-search {
            padding-top: 40px;
        }
    }
</style>