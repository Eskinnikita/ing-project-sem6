<template>
    <div class="approve-form">
        <div class="approve-form__name">
            {{name}} хочет стать партнером medi<strong>center</strong>
        </div>
       <div class="approve-form__controls">
           <button-comp @click.native="approveDoctor">Принять</button-comp>
           <button-comp @click.native="rejectDoctor" reject>Отклонить</button-comp>
       </div>
    </div>
</template>

<script>
    import Button from "../UI/Button"

    export default {
        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String
            }
        },
        components: {
            'button-comp': Button
        },
        created() {
            console.log(this.id)
        },
        methods: {
            approveDoctor() {
                this.$store.dispatch('approveDoctor', {id: this.id, isApproved: true})
                .then(() => {
                    this.$router.push('/doctors-requests')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .approve-form {
        @include flex(space-between, center, row);
        box-sizing: border-box;
        padding: 10px 15px;
        width: 100%;
        height: 70px;
        background-color: #fff;
        border-radius: $border-radius;
    }
</style>