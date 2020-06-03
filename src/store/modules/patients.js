import apiService from "../../services/apiService"

const route = 'patients'

export const state = {

}
export const mutations = {

}
export const actions = {
    async createPatient({commit, dispatch}, patient) {
        try {
            await apiService.post(route, patient)
            await dispatch('loginUser', patient)
            commit('SET_TOAST', {message: 'Вы успешно зарегистрировались!', type: 'success'})
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}

export const getters = {}