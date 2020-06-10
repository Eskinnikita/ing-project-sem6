<template>
    <div class="doctor-snippet">
        <div class="doctor-snippet__photo">
            <div class="doctor-snippet__doctor">

            </div>
        </div>
        <div class="doctor-snippet__doctor-info doctor-info">
            <span class="doctor-info__specs">
                {{parseSpecs(doctor.doctorSpecs)}}
            </span>
            <h3 @click="goToDoctorDetails" class="doctor-info__name">
                {{doctor.name}}
            </h3>
            <div class="doctor-info__work-time">
                Стаж {{expToStr(doctor.experience)}}
            </div>
            <div class="doctor-info__price">
                <span> {{defineWorkSpace(doctor.workType)}} <strong> {{doctor.visitPrice}}&#8381; </strong></span>
            </div>
            <div class="doctor-info__phone-title">
                <div>Телефон для записи</div>
            </div>
            <a href="#" class="doctor-info__phone">
                {{doctor.phoneNumber}}
            </a>
            <div class="doctor-info__address">
                г.{{doctor.city}} {{doctor.clinicAddress}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            doctor: {
                type: Object,
                required: true
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
            },
            parseSpecs(specs) {
                let specsStr = ''
                for (let i = 0; i < specs.length; i++) {
                    if (i === specs.length - 1) {
                        specsStr += ` ${specs[i].specialization.name}`
                    } else {
                        specsStr += `${specs[i].specialization.name} •`
                    }
                }
                return specsStr
            },
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
        }
    }
</script>

<style lang="scss" scoped>
    .doctor-snippet {
        @include flex(flex-start, flex-start, row);
        width: 100%;
        height: 300px;
        background-color: #fff;
        border-radius: $border-radius;
        margin-bottom: 30px;
        padding: 20px 30px;
        box-sizing: border-box;

        &__doctor {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: blue;
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
            margin: 30px 0 7px 0;
        }

        &__phone {
            font-weight: bold;
            text-decoration: none;
            color: #000;
            font-size: 20px;
        }

        &__address {
            margin-top: 15px;
            font-size: 15px;
        }
    }
</style>