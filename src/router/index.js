import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/indexView.vue'
import dashboard from '../views/dashboard.vue'
import personal from '../components/dashboard/personalAdmin.vue'
import services from '../components/dashboard/servicesAdmin.vue'

import jwt_decode from "jwt-decode";
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
    meta: { requiresAdmin: true },
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
router.beforeEach((to, from, next) => {
  const jwtToken = localStorage.getItem('jwtToken');
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      if (decodedToken.role === 'admin') {
        next();
      } else {
        next('/');
      }
    } else {
      next('/');
    }
  } else {
    next();
  }
})
export default router
