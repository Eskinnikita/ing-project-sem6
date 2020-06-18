<template>
    <div id="app">
        <header-comp/>
        <div class="loading" v-show="loadingStatus">
            <clip-loader/>
        </div>
        <div class="container" v-show="!loadingStatus">
            <router-view v-cloak/>
        </div>
    </div>
</template>

<script>
    import Header from "./components/Header"
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        components: {
            'header-comp': Header,
            ClipLoader
        },
        computed: {
            ...mapState(['loadingStatus'])
        }
    }
</script>

<style lang="scss">
    @import "./scss/reset.scss";

    [v-cloak] {
        display: none;
    }

    body {
        position: relative;
        background-color: $background-color;
    }

    a {
        width: 100%;
        text-decoration: none;
    }

    #app {
        font-family: 'Open Sans', sans-serif;
        height: 100%;
    }

    .container {
        box-sizing: border-box;
        width: calc(980px + 40px);
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
    }

    .thin-container {
        box-sizing: border-box;
        width: calc(580px + 40px);
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
    }


    .vm {
        &--modal {
            border-radius: 10px !important;
        }

        &--overlay {
            background: rgba(0, 0, 0, 0.6) !important;
        }
    }

    .underlined-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 15px;
        color: $accent-blue-color;
        text-decoration: underline;

        &:hover {
            text-decoration: underline;
        }
    }

    .required-sign {
        color: $accent-pink-color;
        padding: 0 3px;
    }

    .toast {
        font-family: 'Open Sans', sans-serif;
        background-color: #fff !important;
        &-success {
            color: $accent-blue-color !important;
        }

        &-error {
            color: $accent-pink-color !important;
        }
    }

    .input-wrapper {
        width: 100%;
        margin-bottom: 20px;
        input {
            /*margin-top: 7px;*/
        }
    }

    textarea {
        @include textarea(100%, 200px, none)
    }

    input[type=file] {
        border: none !important;
        padding: 0 !important;
    }

    .title {
        margin-bottom: 10px;
    }

    p {
        font-size: .875rem;
        line-height: 1.25rem;
        font-weight: 400;
    }

    .gray-text {
        color: #abaaaa;
    }

</style>
