import Vue from 'vue';
import VueRouter from 'vue-router';

import Workspaces from '../views/Workspaces.vue';
import WorkspaceForm from '../views/WorkspaceForm.vue';
import Tabs from '../views/Tabs.vue';
import Tab from '../views/Tab.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Workspaces',
    component: Workspaces
  },
  {
    path: '/workspace/:id',
    name: 'Workspace',
    component: Tabs
  },
  {
    path: '/workspace/create',
    name: 'CreateWorkspace',
    component: WorkspaceForm
  },
  {
    path: '/workspace/edit/:id',
    name: 'EditWorkspace',
    component: WorkspaceForm
  },
  {
    path: '/tab/:wsId',
    name: 'NewTab',
    component: Tab
  },
  {
    path: '/tab/:tabId',
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
