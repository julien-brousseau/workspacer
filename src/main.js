import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'

import router from './router'
import store from './store/store'

Vue.use(Vuex)

Vue.filter('shorten', function (str, width = 70) {
  return str.slice(0, width) + ((str.length > width - 4) ? '...' : '')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.devtools = false
