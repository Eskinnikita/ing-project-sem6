<template>
    <div class="controls">
        <confirm-modal :submit-method="submitDeleting">Вы уверены, что хотите удалить профиль?</confirm-modal>
        <button-comp @click.native="goToEditForm" class="controls__button">
            <font-awesome-icon :icon="['fas', 'edit']"/>
        </button-comp>
        <button-comp @click.native="deleteProfile" class="controls__button" reject>
            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
        </button-comp>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Button from "../UI/Button"
    import ConfirmModal from "../Modals/ConfirmModal"

    export default {
        components: {
            'button-comp': Button,
            'confirm-modal': ConfirmModal
        },
        methods: {
            goToEditForm() {
                this.$router.push('/doctor-form')
            },
            deleteProfile() {
                this.$modal.show('confirm-modal')
            },
            submitDeleting() {
                this.$store.dispatch('deleteDoctor', this.user.id)
                .then(() => {
                    this.$modal.hide('confirm-modal')
                    this.$router.push('/')
                })
            }
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .controls {
        padding: 10px 0;
        @include flex(flex-end, center, row);

        &__button {
            font-size: 17px;
        }
    }
</style>