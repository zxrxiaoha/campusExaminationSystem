//admin路由
const TeacherMain = () => import("../views/teachers/TeacherMain.vue");
const CourseCardList = () => import("../views/teachers/Course/CourseCardList.vue");
const CourseStudentEdit = () => import("../views/teachers/Course/CourseStudentEdit.vue");
const CourseStudentList = () => import("../views/teachers/Course/CourseStudentList.vue");
const ProfessionCourseEdit = () => import("../views/teachers/Course/ProfessionCourseEdit.vue");
const ProfessionCourseList = () => import("../views/teachers/Course/ProfessionCourseList.vue");
const CourseTestPaperEdit = () => import("../views/teachers/TestPaper/CourseTestPaperEdit.vue");
const CourseTestPaperList = () => import("../views/teachers/TestPaper/CourseTestPaperList.vue");
const CoursePublishedPaperList = () => import("../views/teachers/TestPaper/CoursePublishedPaperList.vue");
const CourseGradeList = () => import("../views/teachers/ResultsQuery/CourseGradeList.vue");
const StudentScoreList = () => import("../views/teachers/ResultsQuery/StudentScoreList.vue");
const My = () => import('../views/teachers/My/My.vue');
const setPassword = () => import('../views/teachers/My/setPassword.vue');
const Main = () => import('../views/teachers/Main.vue');
export let teacher_main = {
  path: '/teacher_main',
  name: 'teacher_main',
  component: TeacherMain,
  children: [{
      path: 'main',
      component: Main
    }, {
      path: 'course_card/list',
      component: CourseCardList,
    },
    {
      path: 'course_student/create',
      component: CourseStudentEdit,
      // props($route) {
      //   return {
      //     id: $route.query.id
      //   }
      // }
    },
    {
      path: 'course_student/list',
      component: CourseStudentList,
      props($route) {
        return {
          name: $route.query.name
        }
      }
    },
    {
      path: 'profession_course/create',
      component: ProfessionCourseEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'profession_course/list',
      component: ProfessionCourseList
    },
    {
      path: 'course_test_paper/create',
      component: CourseTestPaperEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'course_test_paper/list',
      component: CourseTestPaperList
    },
    {
      path: 'course_published_papers/list',
      component: CoursePublishedPaperList
    },
    {
      path: 'my',
      name: 'My',
      component: My
    },
    {
      path: 'set_pwd',
      component: setPassword
    },
    {
      path: 'course_grade/list',
      component: CourseGradeList
    },
    {
      path: 'student_score/list',
      component: StudentScoreList,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    }
  ]
}