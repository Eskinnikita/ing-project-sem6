<template>
    <header class="header">
        <div class="header__container container">
            <div class="header__title title" @click="goToMainPage">
                <img class="title__icon" src="../assets/icons/logo.png" alt="логотип">
                <h2 class="title__text">medi<strong>center</strong></h2>
            </div>
            <div class="header__user-profile user-profile">
                <div class="user-profile__name">
                    Иванов И.И.
                </div>
                <button class="user-profile__button">
                    выйти
                </button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        methods: {
            goToMainPage() {
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 70px;
        background-color: #fff;

        &__container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .title {
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &__icon {
            height: 40px;
            margin-right: 5px;
        }

        &__text {
            font-weight: normal;
        }
    }

    .user-profile {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        &__name {
            margin-right: 10px;
        }

        &__button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 15px;
            color: $accent-blue-color;
            text-decoration: underline;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>