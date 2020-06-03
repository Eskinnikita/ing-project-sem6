import Vue from 'vue'
import Vuex from 'vuex'
import apiService from "../services/apiService"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: sessionStorage.getItem('user-token') || null,
        loadingStatus: false
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            console.log(user)
        },
        SET_EMPTY_USER(state) {
            state.user = null
        }
    },
    actions: {
        async loginUser({commit}, user) {
            try {
                let res = null
                if (!user.isDoctor) {
                    res = await apiService.post('patients/login', user)
                }
                // if(res === undefined) {
                //     dispatch('setToast', {message: 'Ошибка входа. Проверьте ФИО или пароль', status: 'error'})
                // }
                sessionStorage.setItem('user', JSON.stringify(res.data))
                commit('SET_USER', res.data)
            } catch (e) {
                console.log(e)
            }
        },
        async logoutUser({commit}) {
            sessionStorage.removeItem('user')
            commit('SET_EMPTY_USER')
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        isAdmin: state => state.user.isAdmin
    },
    plugins: [createPersistedState(
        {
            storage: window.sessionStorage
        }
    )]
})