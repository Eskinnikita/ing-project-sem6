<template>
    <div class="reviews-requests">
        <h2 class="reviews-requests__title title">Неопубликованные комментарии <span class="gray-text">• {{ReviewsStore.notApprovedReviews.length}}</span></h2>
        <template v-if="ReviewsStore.notApprovedReviews.length">
            <review-snippet
                    class="reviews-requests__review-snippet"
                    v-for="(review, index) in ReviewsStore.notApprovedReviews"
                    :review="review"
                    :key="index"
            />
        </template>
        <p v-else>Никто пока не оставил отзыв...</p>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ReviewSnippet from "../../components/Reviews/ReviewSnippet"
    export default {
        components: {
            ReviewSnippet
        },
        created() {
            this.$store.dispatch('getNotApprovedReviews')
        },
        computed: {
            ...mapState(['ReviewsStore'])
        }
    }
</script>

<style lang="scss" scoped>
    .reviews-requests {
        &__title {
            margin-bottom: 20px;
        }

        &__review-snippet {
            margin-bottom: 25px;
        }
     }
</style>