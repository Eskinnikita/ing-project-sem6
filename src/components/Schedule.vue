<template>
    <div class="schedule">
        <div class="schedule__days days">
            <button class="days__button" v-for="index in 3" :key="index">Пятница, <br> 6 июня</button>
        </div>
        <div class="schedule__hours hours">
            <button class="hours__button" v-for="index in 12" :key="index">12:00</button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .schedule {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    .days {
        @include flex(space-between, center, row);
        margin-bottom: 20px;
        &__button {
            width: 100%;
            border: 1px solid $border-color;
            border-radius: $border-radius;
            background-color: #fff;
            padding: 5px 15px;
            margin: 0 10px;
            cursor: pointer;
            font-size: 13px;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .hours {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 10px;
        padding-bottom: 10px;
        &__button {
            cursor: pointer;
            border-radius: $border-radius;
            background-color: $accent-blue-color;
            border: none;
            color: #fff;
            padding: 5px 10px;
            font-size: 14px;
        }
    }
</style>