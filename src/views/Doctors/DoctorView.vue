<template>
    <div class="doctor-view-container">
        <approved-profile-snippet
                v-if="displayToSelf"
                :is-approved="isApproved"
                :is-searchable="isSearchable"
                :reason-message="doctor.reasonMessage"
        />
        <approve-form v-if="isAdmin && doctor.id && !doctor.isApproved" :name="doctor.name" :id="doctor.id"/>
        <user-controls v-if="displayToSelf"/>
        <div class="doctor-view">
            <div class="doctor-view__doctor-info doctor-info">
                <div class="doctor-info__info">
                    <div class="doctor-info__photo">
                        <img :src="`http://localhost:8082/${doctor.photo}`" :alt="doctor.name">
                        <star-rating
                                :show-rating="false"
                                :border-width="0"
                                border-color="#24B9D7"
                                :star-size="23"
                                inactive-color="#bebebe"
                                active-color="#24B9D7"
                                :rating="doctor.rating"
                                :read-only="true"
                                :increment="0.01"/>
                    </div>
                    <div class="doctor-info__desc">
                        <h3 class="doctor-info__name">{{doctor.name}}</h3>
                        <span class="doctor-info__specs">{{parseSpecs(doctor.specializations)}}</span>
                        <span>Стаж {{expToStr(doctor.experience)}}</span>
                        <span class="doctor-info__price">От {{doctor.visitPrice}} &#8381;</span>
                    </div>
                </div>
                <div class="doctor-info__about">
                    <h2 class="title">Информация о враче</h2>
                    <p>{{doctor.description}}</p>
                </div>
                <div class="doctor-info__reviews">
                    <h2 class="title">Отзывы</h2>
                </div>
            </div>
            <div class="doctor-view__doctor-schedule doctor-schedule">
                <h2 class="title">Расписание врача</h2>
                <schedule/>
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
    export default {
        components: {
            StarRating,
            Schedule,
            ApproveForm,
            ApprovedProfileSnippet,
            UserControls
        },
        created() {
            this.$store.dispatch('findDoctorById', this.$route.params.id)
        },
        data() {
            return {}
        },
        methods: {
            defineWorkSpace(type) {
                let workType = ''
                switch (type) {
                    case 1:
                        workType = 'В клинике'
                        break;
                    case 2:
                        workType = 'Онлайн'
                        break;
                    case 3:
                        workType = 'На дому'
                        break;
                }
                return workType
            }
            ,
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
            }
        },
        computed: {
            ...mapState(['DoctorsStore', 'user']),
            ...mapGetters(['isAdmin', 'isNotAuthenticated', 'isDoctor']),
            doctor() {
                return this.DoctorsStore.doctor
            },
            displayToSelf() {
                return this.isDoctor && +this.$route.params.id === +this.user.id
            },
            isApproved() {
                return this.doctor.isApproved
            },
            isSearchable() {
                return this.doctor.isSearchable
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
        @include flex(center, flex-start, row);

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
        padding: 20px 20px 30px 20px;
        box-sizing: border-box;
        height: auto;
        width: 430px;
        background-color: #fff;
        border-radius: $border-radius;
        @include materialShadow;
    }
</style>