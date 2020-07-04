import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import BootstrapVue from "bootstrap-vue"

import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/styles.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
