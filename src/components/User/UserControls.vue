<template>
    <div class="controls">
        <button-comp @click.native="goToEditForm" class="controls__button">
            <font-awesome-icon :icon="['fas', 'edit']"/>
        </button-comp>
        <button-comp class="controls__button" reject>
            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
        </button-comp>
    </div>
</template>

<script>
    import Button from "../UI/Button"

    export default {
        components: {
            'button-comp': Button
        },
        methods: {
            goToEditForm() {
                this.$router.push('/doctor-form')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .controls {
        padding: 10px 0;
        @include flex(flex-end, center, row);

        &__button {
            font-size: 17px;
        }
    }
</style>