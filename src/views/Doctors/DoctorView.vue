<template>
    <div class="doctor-view-container">
        <approved-profile-snippet
                v-if="displayToSelf"
                :is-approved="isApproved"
                :is-searchable="isSearchable"
                :reason-message="doctor.reasonMessage"
        />
        <approve-form v-if="isAdmin && doctor.id && !doctor.isApproved" :name="doctor.name" :id="doctor.id"/>
        <div class="doctor-view">
            <div class="doctor-view__doctor-info doctor-info">
                <div class="doctor-info__info">
                    <div class="doctor-info__photo">
                        <img :src="`http://medi-back.std-272.ist.mospolytech.ru/${doctor.photo}`" :alt="doctor.name">
                        <star-rating
                                :show-rating="false"
                                :border-width="0"
                                border-color="#24B9D7"
                                :star-size="23"
                                inactive-color="#bebebe"
                                active-color="#24B9D7"
                                :rating="doctorRating"
                                :read-only="true"
                                :increment="0.01"/>
                        <user-controls v-if="displayToSelf"/>
                    </div>
                    <div class="doctor-info__desc">
                        <h3 class="doctor-info__name">{{doctor.name}}</h3>
                        <span class="doctor-info__specs">{{parseSpecs(doctor.specializations)}}</span>
                        <span>Стаж {{expToStr(doctor.experience)}}</span>
                        <span class="doctor-info__price">От {{doctor.visitPrice}} &#8381; {{defineWorkSpace(doctor.workType)}}</span>
                        <span class="doctor-info__address">Адрес: {{doctor.clinicAddress}}</span>
                        <a v-if="doctor.phoneNumber" :href="`tel:+7${doctor.phoneNumber}`" class="doctor-info__phone-number">+7 {{doctor.phoneNumber | phone}}</a>
                    </div>
                </div>
                <div class="doctor-info__about">
                    <h2 class="title">Информация о враче</h2>
                    <p>{{doctor.description}}</p>
                </div>
                <review-modal/>
                <div class="doctor-info__reviews reviews">
                    <div class="reviews__header">
                        <h2 class="title">Отзывы о враче</h2>
                        <button-comp
                                v-if="(isAdmin || isPatient) && !displayToSelf"
                                @click.native="addReview"
                        >
                            Оставить отзыв
                        </button-comp>
                    </div>
                    <template v-if="doctor.reviews && doctor.reviews.length">
                        <review-snippet
                                class="doctor-info__review-snippet"
                                v-for="(review, index) in doctor.reviews"
                                :review="review"
                                :key="index"
                        />
                    </template>
                    <span v-else>Никто еще не оценил этого врача... <br/> Станьте превым!</span>
                </div>
            </div>
            <div class="doctor-view__doctor-schedule doctor-schedule">
                <template v-if="hasVisitSlots">
                    <div class="doctor-schedule__header">
                        <h2 class="title">Расписание врача</h2>
                        <button-comp
                                v-if="isDoctor && displayToSelf"
                                @click.native="goToScheduleEdit"
                        ><font-awesome-icon :icon="['fas', 'edit']"/></button-comp>
                    </div>
                    <schedule :doctor-id="doctor.id" :schedule="visitsSlots"/>
                </template>
                <template v-else>
                    <h2 class="title">Расписание врача</h2>
                    <p>Расписание не настроено</p>
                    <button-comp v-if="isDoctor && displayToSelf" class="doctor-schedule__edit-button_long" width="100%" @click.native="goToScheduleEdit">Перейти к настройке</button-comp>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import StarRating from 'vue-star-rating'
    import Schedule from "../../components/Schedule"
    import ApproveForm from "../../components/Admin/ApproveForm"
    import ApprovedProfileSnippet from "../../components/Admin/ApprovedProfileSnippet"
    import UserControls from "../../components/User/UserControls"
    import ReviewSnippet from "../../components/Reviews/ReviewSnippet"
    import Button from "../../components/UI/Button"
    import ReviewModal from "../../components/Reviews/ReviewModal"

    export default {
        components: {
            StarRating,
            Schedule,
            ApproveForm,
            ApprovedProfileSnippet,
            UserControls,
            ReviewSnippet,
            ReviewModal,
            'button-comp': Button
        },
        filters: {
            phone(phoneNum) {
                return phoneNum.replace(/[^0-9]/g, '')
                    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            }
        },
        created() {
            this.$store.dispatch('findDoctorById', this.$route.params.id)

        },
        mounted() {

        },
        data() {
            return {
            }
        },
        methods: {
            addReview() {
                this.$modal.show('review-modal')
            },
            parseSpecs(specs) {
                let specsStr = ''
                for (const index in specs) {
                    if (specs.length) {
                        if (+index === specs.length - 1) {
                            specsStr += ` ${specs[index].name}`
                        } else {
                            specsStr += `${specs[index].name} • `
                        }
                    }
                }
                return specsStr
            }
            ,
            expToStr(exp) {
                let txt;
                let count = exp % 100;
                if (count >= 5 && count <= 20) {
                    txt = 'лет';
                } else {
                    count = count % 10;
                    if (count === 1) {
                        txt = 'год';
                    } else if (count >= 2 && count <= 4) {
                        txt = 'года';
                    } else {
                        txt = 'лет';
                    }
                }
                return exp + " " + txt;
            },
            goToScheduleEdit() {
                this.$router.push('/schedule-edit')
            },
            defineWorkSpace(type) {
                let workType = ''
                switch (type) {
                    case 1:
                        workType = 'в клинике'
                        break;
                    case 2:
                        workType = 'Онлайн'
                        break;
                    case 3:
                        workType = 'на дому'
                        break;
                }
                return workType
            }
        },
        computed: {
            ...mapState(['DoctorsStore', 'user']),
            ...mapGetters(['isAdmin', 'isPatient', 'isNotAuthenticated', 'isDoctor']),
            doctor() {
                return this.DoctorsStore.doctor
            },
            doctorId() {
                return this.DoctorsStore.doctor.id
            },
            displayToSelf() {
                return this.isDoctor && +this.$route.params.id === +this.user.id
            },
            isApproved() {
                return this.doctor.isApproved
            },
            isSearchable() {
                return this.doctor.isSearchable
            },
            doctorRating() {
                if (this.DoctorsStore.doctor.reviews && this.DoctorsStore.doctor.reviews.length) {
                    let starsSum = 0
                    this.DoctorsStore.doctor.reviews.forEach(el => {
                        starsSum += +el.rating
                    })
                    return starsSum / this.DoctorsStore.doctor.reviews.length
                } else {
                    return 5;
                }
            },
            hasVisitSlots() {
                return this.doctor && this.doctor.visitSlots && this.doctor.visitSlots.length
            },
            visitsSlots() {
                return this.doctor.visitSlots
            }
        },
        watch: {
            "$route.params.id"() {
                this.$store.dispatch('findDoctorById', this.$route.params.id)
            }
        },
        beforeDestroy() {
            this.$store.commit('SET_EMPTY_DOCTOR')
        }
    }
</script>

<style lang="scss" scoped>
    .doctor-view {
        padding-top: 30px;
        @include flex(flex-start, flex-start, row);

        &__doctor-info {
            height: 100vh;
            width: calc(100% - 400px);
        }

        &__doctor-schedule {

        }
    }

    .doctor-info {
        padding-right: 40px;
        box-sizing: border-box;

        &__address {
            margin: 10px 0;
        }

        &__phone-number {
            color: #000;
            text-decoration: underline;
            margin-top: 5px;
            transition: color 0.3s;
            font-size: 18px;
            &:hover {
                color: $accent-blue-color;
            }
        }

        &__review-snippet {
            margin-bottom: 20px;
        }

        &__info {
            @include flex(flex-start, flex-start, row);
        }

        &__name {
            margin-bottom: 15px;
        }

        &__price {
            margin-top: 10px;
            font-weight: 600;
            font-size: 22px;
        }

        &__specs {
            margin-bottom: 10px;
        }

        &__photo {
            @include flex(center, center, column);
            padding-left: 20px;

            img {
                width: 130px;
                height: 130px;
                object-fit: cover;
                border-radius: 50%;
                margin-bottom: 10px;
                border: 1px solid #d7d7d7ed;
            }
        }

        &__desc {
            padding: 10px 0 0 30px;
            @include flex(center, flex-start, column);
        }

        &__about {
            padding-top: 40px;
            margin-bottom: 30px;
        }
    }

    .doctor-schedule {
        padding: 20px;
        box-sizing: border-box;
        height: auto;
        width: 430px;
        background-color: #fff;
        border-radius: $border-radius;
        min-height: 300px;
        @include materialShadow;

        &__header {
            margin-bottom: 10px;
            @include flex(space-between, center, row);
        }

        &__edit-button {
            &_long {
                margin: 10px 0 0 0;
            }
        }
    }

    .reviews {
        &__header {
            margin-bottom: 10px;
            @include flex(space-between, center, row);
        }
    }
</style>