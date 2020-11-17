import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

import App from './App.vue';

import store from '../store/store';

import SuiVue from 'semantic-ui-vue';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(Vuex);
Vue.use(SuiVue);

Vue.filter('shorten', function (str, width = 70) {
  return str.slice(0, width) + ((str.length > width - 4) ? '...' : '');
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
