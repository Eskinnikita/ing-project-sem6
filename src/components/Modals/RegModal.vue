<template>
    <modal style="{'border-radius': 5px}" height="700" width="400" name="reg-modal">
        <div class="modal-container">
            <h2 class="modal-container__title">Регистрация в medi<strong>center</strong></h2>
            <input-component
                    v-model="user.name"
                    :required="true"
                    id="name"
                    label="Фамилия Имя:"
                    :invalid-condition="$v.user.name.$dirty && !$v.user.name.required"
                    :invalid-message="'Введите фамилию и имя'"
            />
            <input-component
                    v-model="user.email"
                    :required="true"
                    id="email"
                    label="Почта:"
                    :type="'email'"
                    :invalid-condition="$v.user.email.$dirty && !$v.user.email.required"
                    :invalid-message="'Введите почту'"
            />
            <input-component
                    v-model="user.password"
                    :required="true"
                    id="password"
                    label="Пароль:"
                    :type="'password'"
                    :invalid-condition="$v.user.password.$dirty && !$v.user.password.required"
                    :invalid-message="'Введите пароль'"
            />
            <div class="input-wrapper">
                <label for="birthDate">Дата рождения:<span class="required-sign">*</span></label>
                <date-picker  id="birthDate" v-model="user.birthDate"/>
                <span class="input-block__error" v-if="$v.user.birthDate.$dirty && !$v.user.birthDate.required">Введите дату рождения</span>
            </div>
            <div class="input-wrapper">
                <label>Выберите пол:</label> <br>
                <div class="modal-container__genders-wrapper">
                    <label>
                        <input value="1" v-model="user.gender" name="gender" type="radio">
                        Мужской
                    </label>
                    <label>
                        <input value="0" v-model="user.gender" name="gender" type="radio">
                        Женский
                    </label>
                </div>
            </div>
            <button-comp @click.native="createUser" width="100%">Зарегистрироваться</button-comp>
            <button @click="goToLogin" class="modal-container__underlined-button underlined-button">Войти</button>
            <button @click="goToDoctorReg" class="modal-container__underlined-button underlined-button">Стать партнером</button>
        </div>
    </modal>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import Input from "../UI/Input"
    import Button from "../UI/Button"
    import {required} from 'vuelidate/lib/validators'

    export default {
        components: {
            'input-component': Input,
            'button-comp': Button,
            'date-picker': DatePicker
        },
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    birthDate: new Date(),
                    gender: 1
                }
            }
        },
        validations: {
            user: {
                name: {required},
                email: {required},
                password: {required},
                birthDate: {required}
            }
        },
        methods: {
            createUser() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                }
                else {
                    this.$store.dispatch('createPatient', this.user)
                    .then(() => {this.$modal.hide('reg-modal');})
                }
            },
            goToLogin() {
                setTimeout(() => {
                    this.$modal.hide('reg-modal');
                }, 20)
                this.$modal.show('login-modal');
            },
            goToDoctorReg() {
                this.$router.push('/new-doctor')
                .then(() => {this.$modal.hide('reg-modal');})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
       @include modalContainer;

        &__underlined-button {
            margin-top: 10px;
        }

        &__title {
            font-weight: normal;
            margin-bottom: 30px;
        }

        &__genders-wrapper {
            margin-top: 7px;
            label {
                font-size: 15px;
            }
        }
    }

    .mx-datepicker {
        width: 100%;
    }
</style>