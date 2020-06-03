<template>
    <header class="header">
        <div class="header__container container">
            <div class="header__title title" @click="goToMainPage">
                <img class="title__icon" src="../assets/icons/logo.png" alt="логотип">
                <h2 class="title__text">medi<strong>center</strong></h2>
            </div>
            <div class="header__user-profile user-profile" v-if="user">
                <div class="user-profile__name">
                    {{user.name}}
                </div>
                <button class="user-profile__button" @click="logout">
                    выйти
                </button>
            </div>
            <div class="header__controls" v-else>
                <button class="underlined-button" @click="openModal('login-modal')">
                    Войти
                </button>
                <button class="underlined-button" @click="openModal('reg-modal')">
                    Регистрация
                </button>
            </div>
        </div>
        <login-modal/>
        <reg-modal/>
    </header>
</template>

<script>
    import LoginModal from "./LoginModal"
    import RegModal from "./RegModal"
    import {mapState} from 'vuex'

    export default {
        components: {
            'login-modal': LoginModal,
            'reg-modal': RegModal
        },
        methods: {
            goToMainPage() {
                this.$router.push('/')
            },
            openModal(modal) {
                this.$modal.show(modal);
            },
            logout() {
                this.$store.dispatch('logoutUser')
            }
        },
        computed: {
            ...mapState(['user'])
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