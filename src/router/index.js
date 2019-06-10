import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
