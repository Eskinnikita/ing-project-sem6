import apiService from "../../services/apiService"

const route = 'specializations'

export const state = {
    specs: []
}
export const mutations = {
    SET_SPECS(state, specs) {
        console.log(specs)
        state.specs = specs
    }
}
export const actions = {
    async getAllSpecs({commit}) {
        try {
            const data = await apiService.get(route)
            commit('SET_SPECS', data.data)
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, type: 'error'})
        }
    }
}

export const getters = {}