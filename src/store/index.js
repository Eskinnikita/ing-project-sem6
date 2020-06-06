import Vue from 'vue'
import Vuex from 'vuex'
import apiService from "../services/apiService"
import createPersistedState from "vuex-persistedstate";

import * as PatientsStore from "./modules/patients"
import * as SpecsStore from "./modules/specs"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: sessionStorage.getItem('user-token') || null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            console.log(user)
        },
        SET_EMPTY_USER(state) {
            state.user = null
        },
        SET_TOAST(state, toast) {
            console.log(toast)
            this._vm.$toast.open(
                {
                    message: toast.message,
                    type: toast.type
                }
            );
        }
    },
    actions: {
        async loginUser({commit}, user) {
            try {
                let res = null
                if (!user.isDoctor) {
                    res = await apiService.post('patients/login', user)
                }
                sessionStorage.setItem('user', JSON.stringify(res.data))
                commit('SET_USER', res.data)
                commit('SET_TOAST', {message: 'Вы успешно вошли!', type: 'success'})
            } catch (e) {
                commit('SET_TOAST', {message: 'Ошибка входа', type: 'error'})
            }
        },
        async logoutUser({commit}) {
            sessionStorage.removeItem('user')
            commit('SET_EMPTY_USER')
            commit('SET_TOAST', {message: 'Вы успешно вышли!', type: 'success'})
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
    )],
    modules: {
        PatientsStore,
        SpecsStore
    }
})