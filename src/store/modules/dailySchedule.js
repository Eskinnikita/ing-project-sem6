import apiService from "../../services/apiService"

const route = 'daily-schedules'

export const state = {

}
export const mutations = {

}
export const actions = {
    async addDailySchedule({commit}, schedule) {
        try {
            await apiService.post(route, schedule)
            commit('SET_TOAST', {message: 'Расписание обновлено', type: 'success'})
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}

export const getters = {}