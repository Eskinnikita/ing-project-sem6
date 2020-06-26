import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import VueToast from 'vue-toast-notification';
const moment = require('moment')

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faComment,
    faClock,
    faEdit,
    faTrashAlt,
    faUserSecret,
    faUser,
    faDoorOpen,
    faClipboardList,
    faCheckCircle,
    faTimesCircle,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faComment, faTrashAlt, faUserSecret, faUser, faDoorOpen, faClipboardList, faCheckCircle, faTimesCircle, faClock, faEdit, faArrowLeft, faArrowRight)


import 'vue-search-select/dist/VueSearchSelect.css'
import 'vue-toast-notification/dist/theme-default.css';
require('moment/locale/ru')

Vue.use(VueToast);
Vue.use(VModal)
Vue.use(Vuelidate)

Vue.use(require('vue-moment'), {
    moment
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
