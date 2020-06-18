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
        />
        <input-comp
                label="Пароль:"
                id="password"
                :required="true"
                type="password"
                v-model="doctor.password"
        />
        <input-comp
                label="ФИО:"
                id="name"
                :required="true"
                placeholder="Иванов Иван Иванович"
                v-model="doctor.name"
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
        <input-comp
                label="Стаж работы (лет):"
                id="password"
                :required="true"
                type="number"
                v-model="doctor.experience"
        />
        <div class="input-wrapper">
            <label for="city">Тип работы:</label>
            <model-select id="workType" v-model="doctor.workType" placeholder="Тип работы" :options="workTypes"/>
        </div>
        <input-comp
                label="Стоимость приема (от):"
                id="price"
                :required="true"
                type="number"
                v-model="doctor.visitPrice"
        />
        <div class="input-wrapper">
            <label for="city">О себе:</label>
            <textarea v-model="doctor.description"/>
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
                    this.doctor.specs.push({ id: el.id, name: el.name })
                })
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
                const formData = new FormData();
                for(let key in this.doctor) {
                    if(key !== 'specs') {
                        formData.append(`${key}`, this.doctor[key])
                    }
                }
                formData.append('photo', this.photo)
                formData.append('specs', JSON.stringify(this.doctor.specs))
                this.$store.dispatch('addDoctor', formData)
                    .then(() => {
                        this.$router.push('/')
                    })
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