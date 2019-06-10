import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
