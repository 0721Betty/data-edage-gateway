import Vue from 'vue'
import VueRouter from 'vue-router'
import face from '../views/Face.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import main from '../views/Main.vue'

import MelecMachine from '../views/message/elecMachine.vue'
import MslideTable from '../views/message/slideTable.vue'
import Mplc from '../views/message/PLC.vue'
import MpushRod from '../views/message/pushRod.vue'
import Mrelay from '../views/message/Relay.vue'

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
    component: main,
    redirect: 'msg1',
		meta: {
			title: '主界面'
    },
    children: [
      {
        path: '/msg1',
        component: MelecMachine,
        meta: {
          title: '电机信息页面'
        }
      },
      {
        path: '/msg2',
        component: MslideTable,
        meta: {
          title: '滑台信息页面'
        }
      },
      {
        path: '/msg3',
        component: Mplc,
        meta: {
          title: 'PLC信息页面'
        }
      },
      {
        path: '/msg4',
        component: MpushRod,
        meta: {
          title: '推杆信息页面'
        }
      },
      {
        path: '/msg5',
        component: Mrelay,
        meta: {
          title: '继电器信息页面'
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
