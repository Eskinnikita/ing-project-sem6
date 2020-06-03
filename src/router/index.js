import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DoctorsList from "../views/Doctors/DoctorsList"
import DoctorView from "../views/Doctors/DoctorView"

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
    },
    {
        path: '/doctor/:id',
        name: 'DoctorView',
        component: DoctorView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
