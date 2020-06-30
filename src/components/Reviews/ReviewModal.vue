<template>
    <modal name="review-modal" width="400" height="430">
        <div class="review-modal__modal-container modal-container">
            <h2 class="review-modal__title">Оставить отзыв</h2>
            <star-rating
                    class="review-modal__stars"
                    :show-rating="true"
                    :border-width="0"
                    border-color="#24B9D7"
                    :star-size="40"
                    inactive-color="#bebebe"
                    active-color="#24B9D7"
                    :read-only="false"
                    :increment="1"
                    v-model="review.rating"
            />
            <div class="input-wrapper">
                <textarea placeholder="Текст отзыва" v-model="review.text" id="review"/>
                <span class="input-wrapper__error" v-if="$v.review.text.$dirty && !$v.review.text.required">Введите текст отзыва!</span>
            </div>
            <button-comp :is-disabled="isDisabled" style="margin: 0" width="100%" @click.native="sendReview">Отправить
                отзыв
            </button-comp>
        </div>
    </modal>
</template>

<script>
    import {mapState} from 'vuex'
    import StarRating from 'vue-star-rating'
    import Button from "../UI/Button"
    import {required} from 'vuelidate/lib/validators'

    export default {
        components: {
            StarRating,
            'button-comp': Button
        },
        created() {
            this.review.patientId = this.user.id
            this.review.reviewerName = this.user.name
        },
        validations: {
            review: {
                rating: {required},
                text: {required}
            }
        },
        data() {
            return {
                review: {
                    doctorId: null,
                    patientId: null,
                    rating: null,
                    publicationDate: new Date().toISOString().slice(0, 19).split('T')[0],
                    reviewerName: '',
                    text: '',
                    isApproved: false,
                    isDisplayed: false
                }
            }
        },
        methods: {
            sendReview() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.review.doctorId = this.DoctorsStore.doctor.id
                    this.$store.dispatch('addReview', this.review)
                        .then(() => {
                            this.$modal.hide('review-modal')
                        })
                }
            }
        },
        computed: {
            ...mapState(['DoctorsStore', 'user']),
            isDisabled() {
                return !this.review.text && !this.review.rating
            }
        },
        beforeDestroy() {
            this.review = {
                doctorId: null,
                patientId: null,
                rating: null,
                publicationDate: new Date(),
                text: '',
                isApproved: false,
                isDisplayed: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
        @include modalContainer;
    }

    .review-modal {
        &__title {
            margin-bottom: 15px;
        }

        &__modal-container {
            @include flex(center, flex-start, column);
        }
    }

    .vue-star-rating {
        margin-bottom: 10px;
    }
</style>