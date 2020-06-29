<template>
    <modal name="confirm-modal" width="420" height="300">
        <div class="modal-container">
            <p class="confirm-modal__text">
                <slot/>
            </p>
            <div class="confirm-modal__controls">
                <button-comp @click.native="submitMethod" width="45%">Подтвердить</button-comp>
                <button-comp @click.native="closeModal" width="45%" reject>Отменить</button-comp>
            </div>
        </div>
    </modal>
</template>

<script>
    import Button from "../UI/Button"

    export default {
        props: {
            submitMethod: {
                type: Function,
                required: true
            }
        },
        components: {
            'button-comp': Button
        },
        methods: {
            closeModal() {
                this.$modal.hide('confirm-modal')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
        @include modalContainer;
    }

    .confirm-modal {
        &__text {
            font-size: 20px;
            text-align: center;
            width: 100%;
            height: 80px;

        }

        &__controls {
            @include flex(space-between ,center, row);
        }
    }
</style>