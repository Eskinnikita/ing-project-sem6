import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DoctorsList from "../views/DoctorsList"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/doctors/:city?/:spec?',
        name: 'DoctorsList',
        component: DoctorsList
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
