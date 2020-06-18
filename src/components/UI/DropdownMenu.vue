<template>
    <div class="dropdown-container">
        <dropdown-menu
                v-model="isOpened"
                :right="true"
        >
            <button class="user-profile__name">
                {{isDoctor ? parseFullName(user.name) : user.name}}
            </button>
            <div class="dropdown-menu" slot="dropdown">
               <router-link :to="profileRoute">
                   <a class="dropdown-menu__item" href="#">
                       <font-awesome-icon :icon="['fas', 'user']"/>
                       <span class="dropdown-menu__text">Профиль</span>
                   </a>
               </router-link>
               <router-link to="/doctors-requests">
                   <a v-if="isAdmin" class="dropdown-menu__item" href="#">
                       <font-awesome-icon :icon="['fas', 'clipboard-list']"/>
                       <span class="dropdown-menu__text">Заявки</span>
                   </a>
               </router-link>
                <router-link to="/reviews-requests">
                    <a v-if="isAdmin" class="dropdown-menu__item" href="#">
                        <font-awesome-icon :icon="['fas', 'comment']"/>
                        <span class="dropdown-menu__text">Отзывы</span>
                    </a>
                </router-link>
                <a class="dropdown-menu__item" @click="logout" href="#">
                    <font-awesome-icon :icon="['fas', 'door-open']"/>
                    <span class="dropdown-menu__text">Выйти</span>
                </a>
            </div>
        </dropdown-menu>
    </div>
</template>

<script>
    import DropdownMenu from '@innologica/vue-dropdown-menu'
    import {mapState, mapGetters} from "vuex"

    export default {
        components: {
            'dropdown-menu': DropdownMenu
        },
        created() {

        },
        data() {
            return {
                isOpened: false
            }
        },
        methods: {
            parseFullName(name) {
                const nameArr = name.split(' ')
                return `${nameArr[0]} ${nameArr[1][0]}. ${nameArr[2][0]}.`
            },
            logout() {
                this.$store.dispatch('logoutUser')
                .then(() => {
                    this.$router.push('/')
                })
            },
            goToProfile() {
                const route = this.isDoctor ? '/doctor' : '/user'
                this.$router.push(`${route}/${this.user.id}`)
            }
        },
        computed: {
            ...mapState(['user']),
            ...mapGetters(['isAdmin', 'isPatient', 'isDoctor']),
            profileRoute() {
                return this.isDoctor ? `/doctor/${this.user.id}` : `/user/${this.user.id}`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-profile {
        &__name {
            padding: 5px 10px;
            cursor: pointer;
            font-size: 16px;
            border: none;
            background-color: #fff;
            border-radius: $border-radius;
            transition: background-color 0.3s;

            &:hover {
                background-color: rgba(0,0,0,0.1);
            }
        }
    }

    .dropdown-container {
        position: relative;
    }

    .dropdown-menu {
        z-index: 10000;
        width: 150px;
        position: absolute;
        top: 40px;
        left: -5px;
        @include flex(center, flex-start, column);
        @include materialShadow;
        background-color: #fff;
        border-radius: $border-radius;

        &__item {
            @include flex(flex-start, center, row);
            box-sizing: border-box;
            font-size: 15px;
            height: 40px;
            width: 100%;
            padding: 10px 15px;
            text-decoration: none;
            color: #000;
            transition: background-color 0.3s;

            &:hover {
                background-color: rgba(0,0,0,0.1);
            }
        }

        &__text {
            padding-left: 10px;
        }

    }
</style>