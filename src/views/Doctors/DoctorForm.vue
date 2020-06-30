<template>
    <div class="doctor-registration thin-container">
        <h2 v-if="isNotAuthenticated" class="doctor-registration__title">Регистрация врача</h2>
        <h2 v-else class="doctor-registration__title">Редактирование профиля</h2>
        <input-comp
                label="Почта:"
                id="mail"
                :required="true"
                type="email"
                placeholder="email@mail.ru"
                v-model="doctor.email"
                :invalid-condition="$v.doctor.email.$dirty && !$v.doctor.email.required"
                :invalid-message="'Введите почту'"
        />
        <input-comp
                label="Пароль:"
                id="password"
                :required="true"
                type="password"
                v-model="doctor.password"
                :invalid-condition="$v.doctor.password.$dirty && !$v.doctor.password.required"
                :invalid-message="'Введите пароль'"
        />
        <input-comp
                label="ФИО:"
                id="name"
                :required="true"
                placeholder="Иванов Иван Иванович"
                v-model="doctor.name"
                :invalid-condition="$v.doctor.name.$dirty && !$v.doctor.name.required"
                :invalid-message="'Введите ФИО'"
        />
        <div class="input-wrapper">
            <label for="city">Фотография:</label>
            <input ref="previewImageInput" @input="setPhoto" type="file"/>
        </div>
        <input-comp
                label="Телефон:"
                id="phoneNumber"
                :required="true"
                type="text"
                v-model="doctor.phoneNumber"
                :invalid-condition="$v.doctor.phoneNumber.$dirty && !$v.doctor.phoneNumber.required"
                :invalid-message="'Введите номер телефона'"
        />
        <div class="input-wrapper">
            <label>Ваши специальности:<span class="required-sign">*</span></label>
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
            <span class="input-wrapper__error" v-if="!this.doctor.specs.length">Выберите ваши специальности</span>
        </div>
        <input-comp
                label="Стаж работы (лет):"
                id="password"
                :required="true"
                type="number"
                v-model="doctor.experience"
        />
        <div class="input-wrapper">
            <label for="city">Тип работы:<span class="required-sign">*</span></label>
            <model-select id="workType" v-model="doctor.workType" placeholder="Тип работы" :options="workTypes"/>
        </div>
        <input-comp
                label="Стоимость приема (от):"
                id="price"
                :required="true"
                type="number"
                v-model="doctor.visitPrice"
                :invalid-condition="$v.doctor.visitPrice.$dirty && !$v.doctor.visitPrice.required"
                :invalid-message="'Введите стоимость приема'"

        />
        <div class="input-wrapper">
            <label for="city">О себе:</label>
            <textarea v-model="doctor.description"/>
        </div>
        <div class="input-wrapper">
            <label for="city">Ваш город:<span class="required-sign">*</span></label>
            <model-select id="city" v-model="doctor.city" placeholder="Город" :options="cities"/>
            <span class="input-wrapper__error" v-if="$v.doctor.city.$dirty && !$v.doctor.city.required">Выберите ваш город</span>
        </div>
        <input-comp
                label="Адрес клиники:"
                id="password"
                :required="true"
                placeholder="ул.Пушкина д.23 корп.1"
                v-model="doctor.clinicAddress"
                :invalid-condition="$v.doctor.clinicAddress.$dirty && !$v.doctor.clinicAddress.required"
                :invalid-message="'Введите адрес'"
        />
        <button-comp v-if="isNotAuthenticated" @click.native="addDoctor">Оставить заявку</button-comp>
        <button-comp v-else @click.native="editDoctor">Сохранить изменения</button-comp>
    </div>
</template>

<script>
    import Input from "../../components/UI/Input"
    import Button from "../../components/UI/Button"
    import {ModelSelect} from 'vue-search-select'
    import citiesJson from "../../json/cities.json"
    import Multiselect from 'vue-multiselect'
    import {mapState, mapGetters} from 'vuex'
    import {required} from 'vuelidate/lib/validators'

    export default {
        components: {
            'input-comp': Input,
            'button-comp': Button,
            'model-select': ModelSelect,
            'multiselect': Multiselect
        },
        created() {
            this.$store.dispatch('getAllSpecs')
            this.parseCities()
        },
        mounted() {
            if (this.user !== '' && this.isAuthenticated) {
                this.doctor = this.user
                this.imageUrl = this.doctor.photo
                this.doctor.specs = []
                this.user.specializations.forEach(el => {
                    this.doctor.specs.push({id: el.id, name: el.name})
                })
            }
        },
        validations: {
            doctor: {
                email: {required},
                password: {required},
                name: {required},
                phoneNumber: {required},
                visitPrice: {required},
                clinicAddress: {required},
                city: {required}
            }
        },
        data() {
            return {
                doctor: {
                    name: '',
                    workType: 1,
                    email: '',
                    phoneNumber: '+7',
                    password: '',
                    specs: [],
                    city: '',
                    clinicAddress: '',
                    visitPrice: '',
                    experience: 0,
                    description: '',
                    isApproved: false,
                    role: 2
                },
                imageUrl: '',
                cities: null,
                photo: null,
                workTypes: [
                    {
                        value: 1,
                        text: 'В клинике'
                    },
                    {
                        value: 2,
                        text: 'Онлайн'
                    },
                    {
                        value: 3,
                        text: 'На дому'
                    }
                ]
            }
        },
        methods: {
            addDoctor() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    const formData = new FormData();
                    for (let key in this.doctor) {
                        if (key !== 'specs') {
                            formData.append(`${key}`, this.doctor[key])
                        }
                    }
                    formData.append('photo', this.photo)
                    formData.append('specs', JSON.stringify(this.doctor.specs))
                    this.$store.dispatch('addDoctor', formData)
                        .then(() => {
                            this.$router.push('/')
                        })
                }
            },
            setPhoto() {
                this.photo = this.$refs.previewImageInput.files[0];
            },
            parseCities() {
                this.cities = citiesJson.map(el => {
                    return {
                        text: el.name,
                        value: el.name
                    }
                })
            },
            editDoctor() {
                this.doctor.photo = this.user.photo
                this.$store.dispatch('updateDoctor', this.doctor)
                    .then(() => {
                        this.$router.push(`/doctor/${this.user.id}`)
                    })
            }
        },
        computed: {
            ...mapState(['SpecsStore', 'user']),
            ...mapGetters(['isAuthenticated', 'isNotAuthenticated'])
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