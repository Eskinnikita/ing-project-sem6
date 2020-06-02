<template>
    <div id="app">
        <header-comp/>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Header from "./components/Header"

    export default {
        components: {
            'header-comp': Header
        }
    }
</script>

<style lang="scss">
    @import "./scss/reset.scss";

    body {
        background-color: $background-color;
    }

    #app {
        font-family: 'Open Sans', sans-serif;
    }

    .container {
        box-sizing: border-box;
        width: calc(980px + 40px);
        max-width: 100%;
        margin: 0 auto;
        padding: 0 20px;
    }
</style>
