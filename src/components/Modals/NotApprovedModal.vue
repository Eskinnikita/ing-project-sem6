<template>
    <modal class="not-approved-modal" width="400" height="400" name="not-approved-modal">
        <div class="modal-container">
            <h4 class="title">Укажите причину отклонения заявки!</h4>
            <div class="input-wrapper">
                <textarea id="reject-reason" v-model="reasonMessage"/>
            </div>
            <button-comp :is-disabled="isDisabled" width="100%" reject @click.native="confirmRejection">Отклонить</button-comp>
        </div>
    </modal>
</template>

<script>
    import Button from "../UI/Button"

    export default {
        props: {
            id: {
                required: true
            }
        },
        components: {
            'button-comp':Button
        },
        data() {
            return {
                reasonMessage: ''
            }
        },
        methods: {
            confirmRejection() {
                this.$store.dispatch('updateDoctor', {
                    id: this.id,
                    isApproved: true,
                    isSearchable: false,
                    reasonMessage: this.reasonMessage
                })
                .then(() => {
                    this.$modal.hide('not-approved-modal');
                    this.$router.push('/doctors-requests')
                })
            }
        },
        computed: {
            isDisabled() {
                return this.reasonMessage.trim() === ""
            }
        }
    }
</script>

<style lang="scss" scoped>
    .not-approved-modal {

    }

    .modal-container {
        @include modalContainer;
    }
</style>