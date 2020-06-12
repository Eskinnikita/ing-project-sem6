import apiService from "../../services/apiService"

const route = 'doctors'

export const state = {
    doctors: [],
    doctor: {}
}
export const mutations = {
    SET_DOCTORS(state, doctors) {
        state.doctors = doctors
    },
    SET_DOCTOR(state, doctor) {
        state.doctor = doctor
    },
    SET_EMPTY_DOCTOR(state) {
        state.doctor = {}
    }
}
export const actions = {
    async findDoctorsBySpecAndCity({commit}, doctor) {
        try {
            const result = await apiService.post(route, doctor)
            commit('SET_DOCTORS', result.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async findDoctorById({commit}, id) {
        try {
            const result = await apiService.getById(route, id)
            commit('SET_DOCTOR', result.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}

export const getters = {}