import Vue from 'vue'
import VueRouter from 'vue-router'
import face from '../views/Face.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import home from '../views/Home.vue'

import realTime from '../views/message/RealTime.vue'
import history from '../views/message/History.vue'

import CelecMachine from '../views/control/ElecMachine.vue'
import CslideTable from '../views/control/SlideTable.vue'
import CpushRod from '../views/control/PushRod.vue'

import machineInfo from '../views/machineMsg/machineInfo.vue'
import changeInfo from '../views/machineMsg/ChangeInfo.vue'
import tips from '../views/Tips.vue'
import personal from '../views/adminMsg/Personal.vue'
import modifyInfo  from '../views/adminMsg/ModifyInfo.vue'

import notFound from '../views/404.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/face',
  }, 
  {
    path: '/face',
    component: face,
    redirect: '/login',
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
    path: '/home',
    name: 'home',
    component: home,
    redirect: 'home/msg1',
		meta: {
			title: '主界面'
    },
    children: [
      {
        path: '/home/msg1',
        component: realTime,
        meta: {
          title: '实时数据页面'
        }
      },
      {
        path: '/home/msg2',
        component: history,
        meta: {
          title: '历史数据页面'
        }
      },
      {
        path: '/home/ctrl1',
        component: CelecMachine,
        meta: {
          title: '电机控制页面'
        }
      },
      {
        path: '/home/ctrl2',
        component: CslideTable,
        meta: {
          title: '滑台控制页面'
        }
      },
      {
        path: '/home/ctrl3',
        component: CpushRod,
        meta: {
          title: '推杆控制页面'
        }
      },
      {
        path: '/home/machineInfo',
        component: machineInfo,
        meta: {
          title: '设备信息页面'
        }
      },
      {
        path: '/home/changeInfo',
        component: changeInfo,
        meta: {
          title: '设备信息修改页面'
        }
      },
      {
        path: '/home/tips',
        component: tips,
        meta: {
          title: '系统提示页面'
        }
      },
      {
        path: '/home/personal',
        component: personal,
        meta: {
          title: '个人信息'
        }
      },
      {
        path: '/home/modifyInfo',
        component: modifyInfo,
        meta: {
          title: '修改个人信息'
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

// 路由守卫(在地址栏中输入要去的路由去不了，得先登录，localStorage中有token)
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else {
    isLogin ? next() : next('/login');
  }
})

export default router
