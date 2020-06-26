import apiService from "../../services/apiService"

const route = 'visits'

export const state = {
}
export const mutations = {

}
export const actions = {
    async addVisit({commit}, visit) {
        try {
            await apiService.post(route, visit)
            commit('SET_TOAST', {message: 'Вы успешно записались!', type: 'success'})
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
}

export const getters = {}