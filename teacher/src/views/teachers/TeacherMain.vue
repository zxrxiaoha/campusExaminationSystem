<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened :default-active="$route.path">
          <!-- <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-user-solid"></i>人员管理</template
            >
            <el-menu-item-group title="学生管理">
              <el-menu-item index="/teacher_main/student/create"
                >添加课程学生</el-menu-item
              >
              <el-menu-item index="/teacher_main/student/list"
                >学生列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu> -->
          <el-menu-item-group>
            <el-menu-item index="/teacher_main/main">
              <i class="el-icon-s-home"></i>首页</el-menu-item
            >
          </el-menu-item-group>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-s-operation"></i>课程管理</template
            >
            <el-menu-item-group>
              <template slot="title">课程</template>
              <el-menu-item index="/teacher_main/profession_course/create"
                >添加课程</el-menu-item
              >
              <el-menu-item index="/teacher_main/course_card/list"
                >课程列表</el-menu-item
              >
              <el-menu-item index="/teacher_main/course_student/create"
                >添加课程学生</el-menu-item
              >
              <el-menu-item index="/teacher_main/profession_course/list"
                >编辑/删除课程</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-document"></i>试卷管理</template
            >
            <el-menu-item-group title="试题">
              <el-menu-item index="/teacher_main/course_test_paper/create"
                >添加试卷</el-menu-item
              >
              <el-menu-item index="/teacher_main/course_test_paper/list"
                >保存的试卷</el-menu-item
              >
              <el-menu-item index="/teacher_main/course_published_papers/list"
                >已发试卷</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-edit-outline"></i>成绩管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="/teacher_main/course_grade/list"
                >成绩管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>教师信息维护</template
            >
            <el-menu-item-group>
              <el-menu-item index="/teacher_main/my">个人信息</el-menu-item>
              <el-menu-item index="/teacher_main/set_pwd"
                >修改密码</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="getPersonage"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item @click.native="exitLogin"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <span>欢迎您：{{ username }}老师</span>
          <img :src="icon" alt="" class="adminIcon" v-if="icon" />
          <img src="~assets/img/dxyy1.jpg" alt="" class="adminIcon" v-else />
        </el-header>
        <el-main>
          <!-- 路由的缓存，include表示只缓存My路由 -->
          <keep-alive :include="['My']">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "TeacherMain",
  data() {
    return {
      username: "",
      icon: ""
    }
  },
  methods: {
    //退出登录
    exitLogin() {
      localStorage.clear();
      this.$router.replace('/teacher/login');
      this.$message({
        type: "success",
        message: '退出成功'
      })
    },
    //个人信息
    getPersonage() {
      if (this.$route.path == '/teacher_main/my') {
        this.$message({
          type: "warning",
          message: '已在当前页'
        })
      } else {
        this.$router.push("/teacher_main/my");
        this.$message('进入个人信息页')
      }
    },
    async getMy() {
      let res;
      try {
        res = await this.$http.get(`rest/teacher_users/teacher`);//自定义携带的参数
        this.username = res.data.name;
        this.icon = res.data.icon;
        localStorage.personalDetails = JSON.stringify(res.data);
      } catch (error) {
        this.$router.replace('/teacher/login');
      }
    }
  },
  created() {
    this.getMy()
  },
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.adminIcon {
  position: relative;
  top: 15%;
  left: 1%;
  height: 30px;
  border-radius: 50%;
  width: 30px;
  overflow: hidden;
}
</style>