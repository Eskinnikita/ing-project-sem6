import Vue from 'vue'
import Vuex from 'vuex'
import apiService from "../services/apiService"
import createPersistedState from "vuex-persistedstate";

import * as PatientsStore from "./modules/patients"
import * as SpecsStore from "./modules/specs"
import * as DoctorsStore from "./modules/doctors"
import * as ReviewsStore from "./modules/reviews"
import * as VisitsStore from "./modules/visits"
import * as DailySchedulesStore from "./modules/dailySchedule"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {role: 10},
        userToUpdate: {},
        loadingStatus: false
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_USER_TO_UPDATE(state, user) {
            state.userToUpdate = user
        },
        SET_EMPTY_USER(state) {
            state.user = {
                role: 10
            }
        },
        SET_TOAST(state, toast) {
            this._vm.$toast.open(
                {
                    message: toast.message,
                    type: toast.type
                }
            );
        },
        UPDATE_USER(state, user) {
            for (let key in user) {
                state.user[key] = user[key]
            }
        },
        SET_LOADER(state, status) {
            state.loadingStatus = status
        },
        SET_WORKING_DAYS(state, days) {
            state.user.workingDays = days
        }
    },
    actions: {
        async loginUser({commit}, user) {
            try {
                let res = null
                if (!user.isDoctor) {
                    res = await apiService.post('patients/login', user)
                } else {
                    res = await apiService.post('doctors/login', user)
                }
                localStorage.setItem('user', JSON.stringify(res.data))
                commit('SET_USER', res.data)
                commit('SET_TOAST', {message: 'Вы успешно вошли!', type: 'success'})
            } catch (e) {
                commit('SET_TOAST', {message: 'Ошибка входа', type: 'error'})
            }
        },
        async logoutUser({commit}) {
            localStorage.removeItem('user')
            commit('SET_EMPTY_USER')
            commit('SET_TOAST', {message: 'Вы успешно вышли!', type: 'success'})
        },
        async updateUser({commit, dispatch}, user) {
            try {
                await apiService.update(`patients`, user.id, user)
                dispatch('loginUser', {
                    email: user.email,
                    password: user.password,
                    isDoctor: false
                })
                commit('SET_TOAST', {message: 'Данные успешно обновлены!', type: 'success'})
            } catch (e) {
                commit('SET_TOAST', {message: 'Ошибка обновления...', type: 'error'})
            }
        },
    },
    getters: {
        isAuthenticated: state => state.user.role !== 10 && state.user !== '',
        isNotAuthenticated: state => state.user.role === 10 || state.user === '',
        isAdmin: state => state.user.role === 3,
        isPatient: state => state.user.role === 1,
        isDoctor: state => state.user.role === 2
    },
    plugins: [createPersistedState(
        {
            storage: window.sessionStorage
        }
    )],
    modules: {
        PatientsStore,
        SpecsStore,
        DoctorsStore,
        ReviewsStore,
        VisitsStore,
        DailySchedulesStore
    }
})