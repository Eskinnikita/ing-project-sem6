<template>
    <div class="dropdown-container">
        <dropdown-menu
                v-model="isOpened"
                :right="false"
        >
            <button class="user-profile__name">
                {{user.role === 2 ? parseFullName(user.name) : user.name}}
            </button>
            <div class="dropdown-menu" slot="dropdown">
                <a class="dropdown-menu__item" href="#">Профиль</a>
                <a class="dropdown-menu__item" href="#">Another action</a>
                <a class="dropdown-menu__item" href="#">Выйти</a>
            </div>
        </dropdown-menu>
    </div>
</template>

<script>
    import DropdownMenu from '@innologica/vue-dropdown-menu'
    import {mapState} from "vuex"

    export default {
        components: {
            'dropdown-menu': DropdownMenu
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
            }
        },
        computed: {
            ...mapState(['user'])
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
        top: 35px;
        left: -20px;
        @include flex(center, flex-start, column);
        @include materialShadow;
        background-color: #fff;
        border-radius: $border-radius;

        &__item {
            box-sizing: border-box;
            font-size: 15px;
            width: 100%;
            padding: 10px;
            text-decoration: none;
            color: #000;
            transition: background-color 0.3s;

            &:hover {
                background-color: rgba(0,0,0,0.1);
            }
        }

    }
</style>