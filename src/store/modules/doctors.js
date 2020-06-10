import apiService from "../../services/apiService"

const route = 'doctors'

export const state = {
    doctors: []
}
export const mutations = {
    SET_DOCTORS(state, doctors) {
        state.doctors = doctors
    }
}
export const actions = {
    async findDoctorsBySpecAndCity({commit}, doctor) {
        try {
            const result = await apiService.post(route, doctor)
            commit('SET_DOCTORS', result.data)
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}

export const getters = {}