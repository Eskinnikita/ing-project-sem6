<template>
    <div class="profile-status-snippet"
         :class=" isSearchable ? 'approved' : isApproved ? 'not-approved' : 'waiting-for-approving'">
        <div v-if="isSearchable && isApproved" class="profile-status-snippet__status profile-status-snippet__status_approved status">
            <div class="status__icon">
                <font-awesome-icon :icon="['fas', 'check-circle']"/>
            </div>
            <p class="status__text">Профиль проверен и отображается в поиске!</p>
        </div>
        <div v-else-if="!isSearchable && isApproved" class="profile-status-snippet__status profile-status-snippet__status_rejected status">
            <div class="status__left">
                <div class="status__icon">
                    <font-awesome-icon :icon="['fas', 'times-circle']"/>
                </div>
                <p v-if="reasonMessage" class="status__text">Заявка отклонена по причине: {{reasonMessage}} </p>
            </div>
            <button-comp width="280px" @click.native="sendForApproving" reject>Отправить на проверку?</button-comp>
        </div>
        <div v-else-if="!isSearchable && !isApproved" class="profile-status-snippet__status profile-status-snippet__status_waiting status">
            <div class="status__icon">
                <font-awesome-icon :icon="['fas', 'clock']"/>
            </div>
            <p class="status__text">Заявка находится в обработке, пожалуйста, ожидайте</p>
        </div>
    </div>
</template>

<script>
    import Button from "../UI/Button"
    import {mapState} from 'vuex'

    export default {
        props: {
            isApproved: {
                required: true
            },
            isSearchable: {
                required: true
            },
            reasonMessage: {
                type: String
            }
        },
        components: {
            'button-comp': Button
        },
        created() {

        },
        methods: {
            sendForApproving() {
                this.$store.dispatch('updateDoctor', {
                    id: this.user.id,
                    isApproved: false,
                    isSearchable: false
                })
                    .then(() => {
                        this.isApproved = false
                        this.isSearchable = false
                    })
            }
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .profile-status-snippet {
        @include flex(space-between, center, row);
        box-sizing: border-box;
        padding: 10px 15px;
        width: 100%;
        height: 70px;
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: $border-radius;

        &__status {
            &_approved {

            }

            &_rejected {
                display: flex;
                justify-content: space-between !important;
                align-items: center;
            }
        }
    }

    .status {
        width: 100%;
        @include flex(flex-start, center, row);

        &__left {
            width: 100%;
            @include flex(flex-start, center, row);
        }

        &__icon {
            font-size: 35px;
            margin-right: 10px;
        }

        &__text {
            font-size: 16px;
        }
    }

    .approved {
        background-color: rgba(17, 184, 54, 0.4);
        color: #077520;
    }

    .not-approved {
        background-color: #ffa0c0;
        color: #930c0c;
    }

    .waiting-for-approving {
        background-color: #ffc761;
    }
</style>