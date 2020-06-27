import apiService from "../../services/apiService"

const route = 'doctors'

export const state = {
    doctors: [],
    notApprovedDoctors: [],
    doctor: {},
    doctorToUpdate: {}
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
    },
    SET_NOT_APPROVED_DOCTORS(state, doctors) {
        state.notApprovedDoctors = doctors
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
    },
    async addDoctor({commit, dispatch}, doctor) {
        try {
            await apiService.post(`${route}/new-partner`, doctor)
                .then(result => {
                    commit('SET_TOAST', {message: 'Заявка успешно отправлена!', type: 'success'})
                    dispatch('loginUser', {
                        email: result.data.email,
                        password: result.data.password,
                        isDoctor: true
                    })
                })
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async getNotApprovedDoctors({commit}) {
        try {
            const notApprovedDoctors = await apiService.get(`${route}/not-approved`)
            commit('SET_NOT_APPROVED_DOCTORS', notApprovedDoctors.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async updateDoctor({commit}, doctor) {
        try {
            await apiService.update(`${route}`, doctor.id,  doctor)
                .then(() => {
                    commit('SET_TOAST', {message: 'Данные успешно обновлены!', type: 'success'})
                })
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    },
    async deleteDoctor({commit}, id) {
        try {
            await apiService.delete(`${route}`, id)
                .then(() => {
                    commit('SET_TOAST', {message: 'Профиль удален!', type: 'error'})
                })
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}


export const getters = {}