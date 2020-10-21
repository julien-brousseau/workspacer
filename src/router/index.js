import Vue from 'vue';
import VueRouter from 'vue-router';

import List from '../views/List.vue';
import Workspace from '../views/Workspace.vue';
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
    component: Workspace
  },
  {
    path: '/workspace/:id',
    name: 'Workspace',
    component: Workspace
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
