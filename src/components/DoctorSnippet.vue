<template>
    <div class="doctor-snippet">
        <div class="doctor-snippet__photo">
            <div class="doctor-snippet__doctor">

            </div>
        </div>
        <div class="doctor-snippet__doctor-info doctor-info">
            <span class="doctor-info__specs">
                Акушер Политолог Венеролог
            </span>
            <h3 @click="goToDoctorDetails" class="doctor-info__name">
                Васильев Егор Дмитриевич
            </h3>
            <div class="doctor-info__work-time">
                Стаж 20 лет
            </div>
            <div class="doctor-info__price">
               <span> В клинике <strong> 2200Р</strong></span>
            </div>
            <div class="doctor-info__phone-title">
                <div>Телефон для записи</div>
            </div>
            <a href="#" class="doctor-info__phone">
                +7 (939) 323-32-32
            </a>
            <div class="doctor-info__address">
                ул.Пушкина д.Колотушкина, 31
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            goToDoctorDetails() {
                this.$router.push('/doctor/1')
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
            margin: 40px 0 5px 0;
        }

        &__phone {
            font-weight: bold;
            text-decoration: none;
            color: #000;
            font-size: 20px;
        }

        &__address {
            margin-top: 10px;
            font-size: 15px;
        }
    }
</style>