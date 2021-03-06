<template>
    <!--    <div class="doctor-snippet" v-if="doctor.id !== user.id">-->
    <div class="doctor-snippet">
        <div class="doctor-snippet__left">
            <div class="doctor-snippet__photo">
                <img :src="`http://medi-back.std-272.ist.mospolytech.ru/${doctor.photo}`" class="doctor-snippet__doctor" :alt="doctor.name"/>
                <star-rating
                        :show-rating="false"
                        :border-width="0"
                        border-color="#24B9D7"
                        :star-size="23"
                        inactive-color="#bebebe"
                        active-color="#24B9D7"
                        :rating="doctorRating"
                        :read-only="true"
                        :increment="0.01"
                />
            </div>
            <div class="doctor-snippet__doctor-info doctor-info">
            <span class="doctor-info__specs">
                {{parseSpecs(doctor.specializations)}}
            </span>
                <h3 @click="goToDoctorDetails" class="doctor-info__name">
                    {{doctor.name}}
                </h3>
                <div class="doctor-info__work-time">
                    Стаж {{expToStr(doctor.experience)}}
                </div>
                <div class="doctor-info__price">
                    <span> {{defineWorkSpace(doctor.workType)}} <strong> {{doctor.visitPrice}} &#8381; </strong></span>
                </div>
            </div>
        </div>
        <div class="doctor-snippet__right">
            <div class="doctor-info__phone-title">
                <div>Телефон для записи</div>
            </div>
            <a :href="`tel:+7${doctor.phoneNumber}`" class="doctor-info__phone">
                +7 {{doctor.phoneNumber | phone}}
            </a>
            <div class="doctor-info__address">
                г.{{doctor.city}} {{doctor.clinicAddress}}
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import StarRating from "vue-star-rating"

    export default {
        props: {
            doctor: {
                type: Object,
                required: true
            }
        },
        components: {
            StarRating
        },
        filters: {
            phone(phoneNum) {
                return phoneNum.replace(/[^0-9]/g, '')
                    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            }
        },
        methods: {
            goToDoctorDetails() {
                this.$router.push(`/doctor/${this.doctor.id}`)
            },
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
            ...mapState(['user']),
            doctorRating() {
                if (this.doctor.reviews && this.doctor.reviews.length) {
                    let starsSum = 0
                    this.doctor.reviews.forEach(el => {
                        starsSum += +el.rating
                    })
                    return starsSum / this.doctor.reviews.length
                } else {
                    return 5;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .doctor-snippet {
        @include flex(space-between, flex-start, row);
        width: 100%;
        height: 180px;
        background-color: #fff;
        border-radius: $border-radius;
        margin-bottom: 30px;
        padding: 20px 30px;
        box-sizing: border-box;

        &__left {
            @include flex(flex-start, flex-start, row);
            width: calc(100% - 305px);
        }

        &__right {
            text-align: right;
            width: 300px;
        }

        &__doctor {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #d7d7d7ed;
            margin-bottom: 5px;
        }
    }

    .doctor-info {
        padding-left: 35px;

        &__specs {
            font-size: 13px;
            color: $dark-gray;
        }

        &__name {
            cursor: pointer;
            margin: 10px 0;
            transition: color 0.1s;

            &:hover {
                color: $accent-blue-color;
            }

            /*font-weight: normal;*/
        }

        &__price {
            display: inline-block;
            border-radius: $border-radius;
            border: 2px solid $accent-blue-color;
            padding: 15px;
            margin: 10px 0;
        }

        &__phone-title {
            font-size: 13px;
            color: $dark-gray;
            margin: 0 0 7px 0;
        }

        &__phone {
            font-weight: bold;
            text-decoration: none;
            color: #000;
            font-size: 20px;
            transition: color 0.1s;

            &:hover {
                text-decoration: underline;
                color: $accent-blue-color;
            }
        }

        &__address {
            margin-top: 15px;
            font-size: 15px;
        }
    }
</style>