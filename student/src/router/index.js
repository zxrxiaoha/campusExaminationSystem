import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notify } from 'vant';
const Main = () => import("../views/Main.vue");
const Home = () => import("../views/home/Home.vue");
const My = () => import("../views/My/My.vue");
const TestParper = () => import("../components/TestParper.vue");
const CourseTestParper = () => import("../components/CourseTestParper.vue");
const AccomplishTestParper = () => import("../components/AccomplishTestParper.vue");
const Login = () => import('../components/Login.vue');
const SchoolExam = () => import('../views/home/child/school/SchoolExam.vue')
const CourseExam = () => import('../views/home/child/course/CourseExam.vue')
const Accomplish = () => import('../views/home/child/accomplish/Accomplish.vue')
const AccomplishCourse = () => import('../views/home/child/accomplish/AccomplishCourse.vue')
const EditPassword = () => import('../views/My/EditPassword.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/main/home'
  },
  {
    path: "/main",
    redirect: '/main/home',
    component: Main,
    children: [{
        path: 'home',
        component: Home
      },
      {
        path: 'my',
        name:My,
        component: My
      },
      {
        path: 'edit_password/:sId',
        component: EditPassword,
        props:true
      },
      {
        path:'school_exam/:id',
        component:SchoolExam,
        props:true
      },
      {
        path:'course_exam/:id',
        component:CourseExam,
        props:true
      },
      {
        path:'accomplish/:name/:id',
        component:Accomplish,
        props:true
      },
      {
        path: "test_parper",
        name: 'test_parper',
        component: TestParper,
        props($route){
          return {id:$route.query.id}
        }
      },
      {
        path: "course_test_parper",
        name: 'course_test_parper',
        component: CourseTestParper,
        props($route){
          return {id:$route.query.id}
        }
      },
      {
        path: "accomplish_test_parper",
        name: 'accomplish_test_parper',
        component: AccomplishTestParper,
        props($route){
          return {id:$route.query.id}
        }
      },
      {
        path: "accomplish_course",
        name: 'accomplish_course',
        component: AccomplishCourse,
        props($route){
          return {name:$route.query.name}
        }
      }
    ]
  },
  {
    path: '/student/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true //使用可以直接访问
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, form, next) => {
  if (to.path == '/main/my') {
    return next();
  }
  if (localStorage.s_user) {
    if (!to.meta.isPublic && !JSON.parse(localStorage.s_user).s_token) {
      return next('/student/login');
    }
    if (localStorage.personalDetails) {
      let personalDetails = JSON.parse(localStorage.personalDetails)
      if (!personalDetails.college || !personalDetails.profession || !personalDetails.class) {
        Notify({ type: 'warning', message: '请完善个人信息在继续其他操作' });
        return next('/main/my')
      }
    }
  } else if (!to.meta.isPublic && !localStorage.s_token) {
    return next('/student/login');
  }
  next();
})
export default router