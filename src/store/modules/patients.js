import apiService from "../../services/apiService"

const route = 'patients'

export const state = {
    patient: {}
}
export const mutations = {
    SET_PATIENT(state, patient) {
        state.patient = patient
    },
    SET_EMPTY_PATIENT(state) {
        state.patient = {}
    }
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
    },
    async findPatientById({commit}, id) {
        try {
            const result = await apiService.getById(route, id)
            commit('SET_PATIENT', result.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
}

export const getters = {}