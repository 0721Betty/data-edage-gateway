import Vue from 'vue'
import VueRouter from 'vue-router'
import face from '../views/Face.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import main from '../views/Main.vue'

import realTime from '../views/message/realTime.vue'
import history from '../views/message/history.vue'

import CelecMachine from '../views/control/elecMachine.vue'
import CslideTable from '../views/control/slideTable.vue'
import Cplc from '../views/control/PLC.vue'
import CpushRod from '../views/control/pushRod.vue'
import Crelay from '../views/control/Relay.vue'
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
        component: Cplc,
        meta: {
          title: 'PLC控制页面'
        }
      },
      {
        path: '/ctrl4',
        component: CpushRod,
        meta: {
          title: '推杆控制页面'
        }
      },
      {
        path: '/ctrl5',
        component: Crelay,
        meta: {
          title: '继电器控制页面'
        }
      }
    ]
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
