import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'

import store from './store/store'

// Vue.prototype.$browser = require('webextension-polyfill')

Vue.use(Vuex)

Vue.filter('shorten', function (str, width = 40) {
  return str.slice(0, width) + ((str.length > width - 4) ? '...' : '')
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
