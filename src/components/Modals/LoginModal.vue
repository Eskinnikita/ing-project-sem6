<template>
    <modal style="{'border-radius': 5px}" height="400" width="400" name="login-modal">
        <div class="modal-container">
            <h2 class="modal-container__title">Вход в medi<strong>center</strong></h2>
            <input-component
                    class="modal-container__input-block"
                    v-model="user.email"
                    :required="true"
                    id="email"
                    label="Почта:"
                    :type="'email'"
                    :invalid-condition="$v.user.email.$dirty && !$v.user.email.required"
                    :invalid-message="'Введите почту'"
            />
            <input-component
                    class="modal-container__input-block"
                    style="margin-bottom: 10px;"
                    v-model="user.password"
                    :required="true"
                    id="password"
                    label="Пароль:"
                    :type="'password'"
                    :invalid-condition="$v.user.password.$dirty && !$v.user.password.required"
                    :invalid-message="'Введите почту'"
            />
            <div class="modal-container__checkbox">
                <label>
                    <input v-model="user.isDoctor" type="checkbox">
                    я врач
                </label>
            </div>
            <button-comp @click.native="login" width="100%">Войти</button-comp>
            <button @click="goToRegistration" class="modal-container__underlined-button underlined-button">Регистрация</button>
        </div>
    </modal>
</template>

<script>
    import Input from "../UI/Input"
    import Button from "../UI/Button"
    import {required} from 'vuelidate/lib/validators'

    export default {
        components: {
            'input-component': Input,
            'button-comp': Button
        },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    isDoctor: false
                }
            }
        },
        validations: {
            user: {
                email: {required},
                password: {required}
            }
        },
        methods: {
            login() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                }
                else {
                    if(this.isDoctor) {
                        console.log('ВРАЧА ВРАЧА')
                    }
                    else {
                        this.$store.dispatch('loginUser', this.user)
                        .then(() => {
                            this.$modal.hide('login-modal')
                            this.user = {
                                email: '',
                                password: '',
                                isDoctor: false
                            }
                        })
                    }
                }
            },
            goToRegistration() {
                setTimeout(() => {
                    this.$modal.hide('login-modal');
                }, 20)
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

        &__checkbox {
            @include flex(flex-start, center, row);
            width: 100%;
            margin-bottom: 10px;
        }

    }
</style>