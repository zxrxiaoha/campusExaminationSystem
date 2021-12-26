//admin路由
const AdminMain = () => import("../views/administrators/AdminMain.vue");
const AdminEdit = () => import("../views/administrators/Admin/AdminEdit.vue");
const AdminList = () => import("../views/administrators/Admin/AdminList.vue");
const TeacherEdit = () => import("../views/administrators/Teacher/TeacherEdit.vue");
const TeacherList = () => import("../views/administrators/Teacher/TeacherList.vue");
const StudentEdit = () => import("../views/administrators/Student/StudentEdit.vue");
const StudentList = () => import("../views/administrators/Student/StudentList.vue");
const CollegeEdit = () => import("../views/administrators/College/CollegeEdit.vue");
const CollegeList = () => import("../views/administrators/College/CollegeList.vue");
const ProfessionEdit = () => import("../views/administrators/Profession/ProfessionEdit.vue");
const ProfessionList = () => import("../views/administrators/Profession/ProfessionList.vue");
const ClassEdit = () => import("../views/administrators/Class/ClassEdit.vue");
const ClassList = () => import("../views/administrators/Class/ClassList.vue");
const CourseEdit = () => import("../views/administrators/Course/CourseEdit.vue");
const CourseList = () => import("../views/administrators/Course/CourseList.vue");
const TestPaperEdit = () => import("../views/administrators/TestPaper/TestPaperEdit.vue");
const TestPaperList = () => import("../views/administrators/TestPaper/TestPaperList.vue");
const PublishedPaperList = () => import("../views/administrators/TestPaper/PublishedPaperList.vue");
const CollegeCardList = () => import("../views/administrators/ResultsQuery/CollegeCardList.vue");
const ProfessionCardList = () => import("../views/administrators/ResultsQuery/ProfessionCardList.vue");
const ClassCardList = () => import("../views/administrators/ResultsQuery/ClassCardList.vue");
const CourseCardList = () => import("../views/administrators/ResultsQuery/CourseCardList.vue");
const ClassScoreList = () => import("../views/administrators/ResultsQuery/ClassScoreList.vue");
const My = () => import('../views/administrators/My/My.vue');
const setPassword = () => import('../views/administrators/My/setPassword.vue');
const Main = () => import('../views/administrators/Main.vue');

export let admin_main = {
  path: '/admin_main',
  name: 'admin_main',
  component: AdminMain,
  children: [{
      path: 'main',
      component: Main
    }, {
      path: 'admin/create',
      component: AdminEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'admin/list',
      component: AdminList
    },
    {
      path: 'teacher/create',
      component: TeacherEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'teacher/list',
      component: TeacherList
    },
    {
      path: 'student/create',
      component: StudentEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'student/list',
      component: StudentList
    },
    {
      path: 'college/create',
      component: CollegeEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'college/list',
      component: CollegeList
    },
    {
      path: 'profession/create',
      component: ProfessionEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'profession/list',
      component: ProfessionList
    },
    {
      path: 'class/create',
      component: ClassEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'class/list',
      component: ClassList
    },
    {
      path: 'course/create',
      component: CourseEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'course/list',
      component: CourseList
    },
    {
      path: 'test_paper/create',
      component: TestPaperEdit,
      props($route) {
        return {
          id: $route.query.id
        }
      }
    },
    {
      path: 'test_paper/list',
      component: TestPaperList
    },
    {
      path: 'published_paper/list',
      component: PublishedPaperList
    },
    {
      path: 'college_card/list',
      component: CollegeCardList
    },
    {
      path: 'profession_card/list',
      component: ProfessionCardList,
      props($route) {
        return {
          college: $route.query.college
        }
      }
    },
    {
      path: 'class_card/list',
      component: ClassCardList,
      props($route) {
        return {
          college: $route.query.college,
          profession: $route.query.profession
        }
      }
    },
    {
      path: 'course_card/list',
      component: CourseCardList,
      props($route) {
        return {
          college: $route.query.college,
          profession: $route.query.profession,
          classes: $route.query.class
        }
      }
    },
    {
      path: 'class_score/list',
      component: ClassScoreList,
      props($route) {
        return {
          college: $route.query.college,
          profession: $route.query.profession,
          classes: $route.query.class,
          course: $route.query.course
        }
      }
    },
    {
      path: 'my',
      component: My
    },
    {
      path: 'set_pwd',
      component: setPassword
    },

  ]
}