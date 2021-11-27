import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  teacher_main
} from './teacher_main';
const Login = () => import('../views/Login.vue');

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/teacher_main/main'
  },
  {
    path: '/teacher_main',
    redirect: '/teacher_main/main'
  },
  //教师的路由
  teacher_main,
  {
    path: '/teacher/login',
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
//to:  即将要进入的目标 路由对象
//from: 当前导航正要离开的路由
//next()：接着走
router.beforeEach((to, form, next) => {
  if (to.path == '/teacher_main/my') {
    return next();
  }
  if (localStorage.t_user) {
    if (!to.meta.isPublic && !JSON.parse(localStorage.t_user).t_token) {
      return next('/teacher/login');
    }
    if (localStorage.personalDetails) {
      let personalDetails = JSON.parse(localStorage.personalDetails)
      if (!personalDetails.college || !personalDetails.profession || !personalDetails.class) {
        //如果不创建不知道怎么办
        let a = new Vue()
        a.$message({
          type: 'warning',
          message: '请完善个人信息在继续其他操作!'
        });
        return next('/teacher_main/my')
      }
    }
  }
  next();
})
export default router