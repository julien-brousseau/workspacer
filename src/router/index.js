import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/ws',
    name: 'Details',
    component: Details
  }
]

const router = new VueRouter({
  routes
})

export default router
