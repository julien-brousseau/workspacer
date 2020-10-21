import Vue from 'vue';
import VueRouter from 'vue-router';

import List from '../views/List.vue';
// import WSDetails from '../views/Details.vue';
// import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/popup/main.js',
  routes
});

export default router;
