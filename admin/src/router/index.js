import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  admin_main
} from './admin_main';
const Login = () => import('../views/Login.vue');

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/admin_main/main'
  },
  {
    path: '/admin_main',
    redirect: '/admin_main/main'
  },
  //管理员的路由
  admin_main,
  {
    path: '/admin/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true //使用可以直接访问
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, form, next) => {
  //每次路由跳转之前，去本地看看有没有管理员的token
  if (!to.meta.isPublic && !localStorage.a_token) {
    return next('/admin/login');
  }
  next();
})
export default router