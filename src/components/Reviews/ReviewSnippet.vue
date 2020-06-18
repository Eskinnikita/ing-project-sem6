<template>
    <div class="review-snippet">
        <div class="review-snippet__header">
            <star-rating
                    :show-rating="false"
                    :border-width="0"
                    border-color="#24B9D7"
                    :star-size="18"
                    inactive-color="#bebebe"
                    active-color="#24B9D7"
                    :rating="+review.rating"
                    :read-only="true"
                    :increment="0.01"
            />
            <div class="review-snippet__reviewer-name">
                {{review.reviewerName}}
            </div>
        </div>
        <p class="review-snippet__text">
            {{review.text}}
        </p>
        <div class="review-snippet__date">
            <span>Опубликовано {{date}}</span>
        </div>
        <div v-if="isAdmin && review.isApproved === false" class="review-snippet__controls">
            <button-comp @click.native="publishReview">Опубликовать</button-comp>
            <button-comp reject @click.native="rejectReview">Отклонить</button-comp>
        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import Button from "../UI/Button"
    import {mapGetters} from 'vuex'

    export default {
        components: {
            StarRating,
            'button-comp': Button
        },
        props: {
            review: {
                type: Object,
                required: true
            }
        },
        methods: {
            publishReview() {
                this.review.isApproved = true
                this.review.isDisplayed = true
                this.$store.dispatch('publishReview', this.review)
            },
            rejectReview() {
                this.review.isApproved = true
                this.review.isDisplayed = false
                this.$store.dispatch('rejectReview', this.review)
            }

        },
        computed: {
            date() {
                const dateArr = this.review.publicationDate.split('-')
                return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
            },
            ...mapGetters(['isAdmin'])
        }
    }
</script>

<style lang="scss" scoped>
    .review-snippet {
        width: 100%;
        background-color: #fff;
        border-radius: $border-radius;
        padding: 15px 10px 15px 15px;
        box-sizing: border-box;

        &__header {
            @include flex(flex-start, center, row);
        }

        &__reviewer-name {
            margin-left: 5px;
        }

        &__text {
            margin-top: 13px;
        }

        &__date {
            border-top: 1px solid $border-color;
            font-size: 12px;
            padding-top: 10px;
            margin-top: 10px;
        }

        &__controls {
            padding-top: 20px;

            button:first-child {
                margin-left: 0;
            }
        }
    }
</style>