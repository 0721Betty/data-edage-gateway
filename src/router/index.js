import Vue from 'vue'
import VueRouter from 'vue-router'
import face from '../views/Face.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import main from '../views/Main.vue'

import realTime from '../views/message/RealTime.vue'
import history from '../views/message/History.vue'

import CelecMachine from '../views/control/ElecMachine.vue'
import CslideTable from '../views/control/SlideTable.vue'
import CpushRod from '../views/control/PushRod.vue'

import Tips from '../views/Tips.vue'

import notFound from '../views/404.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'face',
  }, 
  {
    path: '/face',
    component: face,
    redirect: 'login',
    meta: {
			title: '首页门面'
		},
    children: [
      {
        path: '/login',
        component: login,
        meta: {
          title: '登录'
        }
      },
      {
        path: '/register',
        component: register,
        meta: {
          title: '注册'
        }
      }
    ]
  }, 
  {
    path: '/main',
    name: 'main',
    component: main,
    redirect: 'msg1',
		meta: {
			title: '主界面'
    },
    children: [
      {
        path: '/msg1',
        component: realTime,
        meta: {
          title: '实时数据页面'
        }
      },
      {
        path: '/msg2',
        component: history,
        meta: {
          title: '历史数据页面'
        }
      },
      {
        path: '/ctrl1',
        component: CelecMachine,
        meta: {
          title: '电机控制页面'
        }
      },
      {
        path: '/ctrl2',
        component: CslideTable,
        meta: {
          title: '滑台控制页面'
        }
      },
      {
        path: '/ctrl3',
        component: CpushRod,
        meta: {
          title: '推杆控制页面'
        }
      },
      {
        path: '/tips',
        component: Tips,
        meta: {
          title: '系统提示页面'
        }
      }
    ]
  },
  {
    path: '/*',
    component: notFound,
    meta: {
      title: '404'
    }
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
