import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/indexView.vue'
import dashboard from '../views/dashboard.vue'
import personal from '../components/dashboard/personalAdmin.vue'
import services from '../components/dashboard/servicesAdmin.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    children: [
      {
        path: 'personal',
        component: personal
      },
      {
        path: 'services',
        component: services
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
