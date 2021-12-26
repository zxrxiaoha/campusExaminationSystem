<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened :default-active="$route.path">
          <!-- <el-submenu index="1"> -->
          <!-- <template slot="title"
              ><i class="el-icon-s-home"></i>首页</template
            > -->
          <el-menu-item-group>
            <el-menu-item index="/admin_main/main">
              <i class="el-icon-s-home"></i>首页</el-menu-item
            >
          </el-menu-item-group>
          <!-- </el-submenu> -->
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-user-solid"></i>人员管理</template
            >
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_main/admin/create"
                >添加管理员</el-menu-item
              >
              <el-menu-item index="/admin_main/admin/list"
                >管理员列表</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="教师管理">
              <el-menu-item index="/admin_main/teacher/create"
                >添加教师</el-menu-item
              >
              <el-menu-item index="/admin_main/teacher/list"
                >教师列表</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="学生管理">
              <el-menu-item index="/admin_main/student/create"
                >添加学生</el-menu-item
              >
              <el-menu-item index="/admin_main/student/list"
                >学生列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-menu"></i>学院管理</template
            >
            <el-menu-item-group>
              <template slot="title">学院</template>
              <el-menu-item index="/admin_main/college/create"
                >添加学院</el-menu-item
              >
              <el-menu-item index="/admin_main/college/list"
                >学院列表</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="专业">
              <el-menu-item index="/admin_main/profession/create"
                >添加专业</el-menu-item
              >
              <el-menu-item index="/admin_main/profession/list"
                >专业列表</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="班级">
              <el-menu-item index="/admin_main/class/create"
                >添加班级</el-menu-item
              >
              <el-menu-item index="/admin_main/class/list"
                >班级列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-s-operation"></i>课程管理</template
            >
            <el-menu-item-group>
              <template slot="title">课程</template>
              <el-menu-item index="/admin_main/course/create"
                >添加课程</el-menu-item
              >
              <el-menu-item index="/admin_main/course/list"
                >课程列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-document"></i>试卷管理</template
            >
            <el-menu-item-group title="试题">
              <el-menu-item index="/admin_main/test_paper/create"
                >添加试卷</el-menu-item
              >
              <el-menu-item index="/admin_main/test_paper/list"
                >试卷列表</el-menu-item
              >
              <el-menu-item index="/admin_main/published_paper/list"
                >已发试卷</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-edit-outline"></i>成绩管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="/admin_main/college_card/list"
                >成绩管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"
              ><i class="el-icon-setting"></i>管理员信息维护</template
            >
            <el-menu-item-group>
              <el-menu-item index="/admin_main/my">查询个人信息</el-menu-item>
              <el-menu-item index="/admin_main/set_pwd">修改密码</el-menu-item>
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
          <span>欢迎您：{{ username }}管理员</span>
          <img :src="icon" alt="" class="adminIcon" v-if="icon" />
          <img src="~assets/img/dxyy1.jpg" alt="" class="adminIcon" v-else />
        </el-header>
        <el-main>
          <!-- <keep-alive :include="['Main']"> -->
            <router-view />
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "AdminMain",
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
      this.$router.replace('/login');
    },
    //路由跳转到个人信息页
    getPersonage() {
      this.$router.push("/admin_main/my");
    },
    //获取个人信息
    async getMy() {
      const res = await this.$http.get(`rest/admin_users/admin`);//自定义携带的参数
      this.username = res.data.name;
      this.icon = res.data.icon;
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