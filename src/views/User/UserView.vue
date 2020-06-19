<template>
    <div class="user-view thin-container">
        <h2 class="title">
            Изменение профиля
        </h2>
        <input-comp
                label="Почта:"
                id="mail"
                :required="true"
                type="email"
                placeholder="email@mail.ru"
                v-model="userData.email"
        />
        <input-comp
                label="Пароль:"
                id="password"
                :required="true"
                type="text"
                v-model="userData.password"
        />
        <input-comp
                label="Фамилия Имя:"
                id="name"
                :required="true"
                type="text"
                v-model="userData.name"
        />
        <div class="input-wrapper">
            <label>Дата рождения:<span class="required-sign">*</span></label>
            <date-picker style="width: 100%; margin-top: 5px;"  id="birthDate" v-model="userData.birthDate"/>
        </div>
        <div class="input-wrapper">
            <label>Пол:</label> <br>
            <div class="user-view__genders-wrapper">
                <label>
                    <input :value="true" v-model="userData.gender" name="gender" type="radio">
                    Мужской
                </label>
                <label>
                    <input :value="false" v-model="userData.gender" name="gender" type="radio">
                    Женский
                </label>
            </div>
        </div>
        <button-comp @click.native="saveChanges" width="100%">Сохранить изменения</button-comp>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Input from "../../components/UI/Input"
    import Button from "../../components/UI/Button"
    import DatePicker from 'vue2-datepicker';
    export default {
        created() {
            this.userData = JSON.parse(JSON.stringify(this.user))
        },
        components: {
            'input-comp': Input,
            'button-comp': Button,
            'date-picker': DatePicker
        },
        data() {
            return {
                userData: {}
            }
        },
        methods: {
            saveChanges() {
                this.$store.dispatch('updateUser', this.userData)
            }
        },
        computed: {
            ...mapState(['PatientsStore', 'user']),
            patient() {
                return this.PatientsStore.patient
            }
        },
        beforeDestroy() {
            this.$store.commit('SET_EMPTY_PATIENT')
        }
    }
</script>

<style lang="scss" scoped>
    .user-view {
        padding-top: 20px;

        button {
            margin: 0;
        }

        &__genders-wrapper {
            margin-top: 7px;
            label {
                font-size: 15px;
            }
        }
    }
</style>