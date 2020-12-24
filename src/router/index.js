import Vue from 'vue';
import VueRouter from 'vue-router';

import List from '../views/List.vue';
import Form from '../views/Form.vue';
import Tabs from '../views/Tabs.vue';
import Tab from '../views/Tab.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/workspace/:id',
    name: 'Workspace',
    component: Tabs
  },
  {
    path: '/workspace/create',
    name: 'Create',
    component: Form
  },
  {
    path: '/workspace/edit/:id',
    name: 'Edit',
    component: Form
  },
  {
    path: '/tab/:wsId',
    name: 'NewTab',
    component: Tab
  },
  {
    path: '/tab/:id',
    name: 'Tab',
    component: Tab
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
