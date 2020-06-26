//import apiService from "../../services/apiService"

import apiService from "../../services/apiService"

const route = 'reviews'

export const state = {
    notApprovedReviews: []
}
export const mutations = {
    SET_NOT_APPROVED_REVIEWS(state, doctors) {
        state.notApprovedReviews = doctors
    },
    DELETE_REVIEW(state, id) {
        const reviewIndex = state.notApprovedReviews.findIndex(el => {
            return el.id === id
        })
        state.notApprovedReviews.splice(reviewIndex, 1)
    }
}
export const actions = {
    async addReview({commit}, review) {
        try {
            await apiService.post(route, review)
            commit('SET_TOAST', {message: 'Отзыв отправлен на модерацию!', type: 'success'})
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async getNotApprovedReviews({commit}) {
        try {
            const notApprovedReviews = await apiService.get(`${route}/not-approved`)
            commit('SET_NOT_APPROVED_REVIEWS', notApprovedReviews.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async publishReview({commit}, review) {
        try {
            await apiService.update(`${route}`, review.id, review)
            commit('DELETE_REVIEW', review.id)
            commit('SET_TOAST', {message: 'Отзыв опубликован!', type: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async rejectReview({commit}, review) {
        try {
            await apiService.update(`${route}`, review.id, review)
            commit('DELETE_REVIEW', review.id)
            commit('SET_TOAST', {message: 'Отзыв отклонен!', type: 'error'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}

export const getters = {}