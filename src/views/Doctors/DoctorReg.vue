<template>
    <div class="doctor-registration thin-container">
        <h2 class="doctor-registration__title">Регистрация врача</h2>
        <input-comp
                label="ФИО:"
                id="name"
                :required="true"
                placeholder="Иванов Иван Иванович"
                v-model="doctor.name"
        />
        <input-comp
                label="Почта:"
                id="mail"
                :required="true"
                type="email"
                placeholder="email@mail.ru"
                v-model="doctor.email"
        />
        <input-comp
                label="Пароль:"
                id="password"
                :required="true"
                type="password"
                v-model="doctor.password"
        />
        <input-comp
                label="Фотография:"
                id="password"
                :required="true"
                type="file"
                v-model="doctor.photo"
        />
        <div class="input-wrapper">
            <label>Ваши специальности:</label>
            <multiselect
                    track-by="name"
                    label="name"
                    v-model="doctor.specs"
                    placeholder="Специальности"
                    :multiple="true"
                    :taggable="true"
                    :hide-selected="true"
                    :options="SpecsStore.specs"
            />
        </div>
        <div class="input-wrapper">
            <label for="city">Ваш город:</label>
            <model-select id="city" v-model="doctor.city" placeholder="Город" :options="cities"/>
        </div>
        <input-comp
                label="Адрес клиники:"
                id="password"
                :required="true"
                placeholder="ул.Пушкина д.23 корп.1"
                v-model="doctor.clinicAddress"
        />
        <input-comp
                label="Стаж работы (лет):"
                id="password"
                :required="true"
                type="number"
                v-model="doctor.experience"
        />
        <div class="input-wrapper">
            <label for="city">О себе:</label>
            <textarea v-model="doctor.about"/>
        </div>
        <button-comp @click.native="addDoctor">Оставить заявку</button-comp>
    </div>
</template>

<script>
    import Input from "../../components/UI/Input"
    import Button from "../../components/UI/Button"
    import {ModelSelect} from 'vue-search-select'
    import citiesJson from "../../json/cities.json"
    import Multiselect from 'vue-multiselect'
    import {mapState} from 'vuex'

    export default {
        components: {
            'input-comp': Input,
            'button-comp': Button,
            'model-select': ModelSelect,
            'multiselect': Multiselect
        },
        created() {
            this.$store.dispatch('getAllSpecs')
            this.cities = citiesJson.map(el => {
                return {
                    text: el.name,
                    value: el.name
                }
            })
        },
        data() {
            return {
                cities: null,
                doctor: {
                    name: '',
                    email: '',
                    photo: '',
                    password: '',
                    specs: [],
                    city: '',
                    clinicAddress: '',
                    experience: 0,
                    about: '',
                    approved: false,
                }
            }
        },
        methods: {
            addDoctor() {
                console.log(this.doctor)
            }
        },
        computed: {
            ...mapState(['SpecsStore'])
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
    .doctor-registration {
        @include flex(center, center, column);

        &__title {
            margin: 0 0 20px 0;
        }

        .input-block {
            margin-bottom: 10px;
        }
    }

    .input-wrapper {
        label {
            display: block;
            margin-bottom: 7px;
        }
    }

    .multiselect {
        &__tag {
            background: $accent-blue-color !important;
        }
    }
</style>