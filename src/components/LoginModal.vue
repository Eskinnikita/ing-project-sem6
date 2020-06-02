<template>
    <modal style="{'border-radius': 5px}" height="400" width="400" name="login-modal">
        <div class="modal-container">
            <h2 class="modal-container__title">Вход в medi<strong>center</strong></h2>
            <input-component id="email" label="Почта:"/>
            <input-component id="password" label="Пароль:"/>
            <button-comp width="100%">Войти</button-comp>
            <button @click="goToRegistration" class="modal-container__underlined-button underlined-button">Регистрация</button>
        </div>
    </modal>
</template>

<script>
    import Input from "./UI/Input"
    import Button from "./UI/Button"

    export default {
        components: {
            'input-component': Input,
            'button-comp': Button
        },
        methods: {
            goToRegistration() {
                this.$modal.hide('login-modal');
                this.$modal.show('reg-modal');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
        height: 100%;
        width: 100%;
        @include flex(center, center, column);
        box-sizing: border-box;
        padding: 10px 30px;

        &__underlined-button {
            margin-top: 10px;
        }

        &__title {
            font-weight: normal;
            margin-bottom: 30px;
        }
    }
</style>