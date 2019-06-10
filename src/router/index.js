import Vue from 'vue'
import VueRouter from 'vue-router'
import face from '../views/Face.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import main from '../views/Main.vue'
import sider from '../components/Sider.vue'
import header from '../components/Header.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, 
  {
    path: '/',
    component: face,
    children: [
      {
        path: '/login',
        component: login
      },
      {
        path: '/register',
        component: register
      }
    ]
  }, 
  {
    path: '/main',
    component: main
  },
  {
    path: '/sider',
    component: sider
  },
  {
    path: '/header',
    component: header
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
