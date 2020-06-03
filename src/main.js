import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import VueToast from 'vue-toast-notification';

import 'vue-search-select/dist/VueSearchSelect.css'
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast);
Vue.use(VModal)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
