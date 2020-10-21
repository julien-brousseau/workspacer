import Vue from 'vue';
import VueRouter from 'vue-router';

import List from '../views/List.vue';
import Details from '../views/Details.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/create',
    name: 'Create',
    component: Details
  },
  {
    path: '/workspace/:id',
    name: 'Workspace',
    component: Details
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/popup/main.js',
  routes
});

export default router;
