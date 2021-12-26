<template>
  <div>
    <el-row :gutter="40" style="margin: 30px 0">
      <el-col :span="8" @click.native="$router.push('admin/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #f2768e"
        >
          <i class="el-icon-user-solid"></i>
          <div style="font-size: 20px">管理员人数：{{ people.adminNum }}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('teacher/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #18d7d0"
        >
          <i class="el-icon-user-solid"></i>
          <div style="font-size: 20px">教师人数：{{ people.teacherNum }}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('student/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #0598db"
        >
          <i class="el-icon-user-solid"></i>
          <div style="font-size: 20px">学生人数：{{ people.studentNum }}</div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="40" style="margin: 30px 0">
      <el-col :span="8" @click.native="$router.push('college/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #8956a1"
        >
          <i class="el-icon-school"></i>
          <div style="font-size: 20px">学院个数：{{ collegesNum }}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('college/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #01984c"
        >
          <i class="el-icon-school"></i>
          <div style="font-size: 20px">专业个数：{{ professionsNum }}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('class/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #efd07c"
        >
          <i class="el-icon-school"></i>
          <div style="font-size: 20px">班级个数：{{ classesNum }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin: 30px 0">
      <el-col :span="8" @click.native="$router.push('course/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #91cc75"
        >
          <i class="el-icon-notebook-2"></i>
          <div style="font-size: 20px">课程个数：{{courseNum}}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('published_paper/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #f89183"
        >
          <i class="el-icon-document"></i>
          <div style="font-size: 20px">已发试卷：{{testPpaperNum}}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('college_card/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #7c90ef"
        >
          <i class="el-icon-document-checked"></i>
          <div style="font-size: 20px">成绩查询 <i class="el-icon-caret-right"></i> </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin: 30px 0">
      <el-col :span="12">
        <el-card shadow="always" class="radius" style="margin: auto"
          ><people-echarts :people="people"
        /></el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" class="radius" style="margin: auto">
          <people-sex-echarts :sex="sex"
        /></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PeopleEcharts from './echarts/PeopleEcharts.vue';
import PeopleSexEcharts from './echarts/PeopleSexEcharts.vue';
export default {
  name: 'Main',
  components: { PeopleEcharts, PeopleSexEcharts },
  data() {
    return {
      //人数
      people: {
        adminNum: 0,
        teacherNum: 0,
        studentNum: 0
      },
      //性别
      sex: {
        teacherSex: {
          man: 0,
          girl: 0,
          unknown: 0
        },
        studentSex: {
          man: 0,//男
          girl: 0,//女
          unknown: 0//未知
        },
      },
      collegesNum: 0,
      professionsNum: 0,
      classesNum: 0,
      courseNum:0,
      testPpaperNum:0
    };
  },
  methods: {
    async getPeopleNum() {
      //人员
      let admin = await this.$http.get('rest/admin_users');
      let teacher = await this.$http.get('rest/teacher_users');
      let student = await this.$http.get('rest/student_users');
      this.people.adminNum = admin.data.length
      this.people.teacherNum = teacher.data.length
      this.people.studentNum = student.data.length
      teacher.data.map(item => {
        if (item.gender == 1) {
          this.sex.teacherSex.man++;
        } else if (item.gender == 0) {
          this.sex.teacherSex.girl++;
        } else {
          this.sex.teacherSex.unknown++;
        }
      })
      student.data.map(item => {
        if (item.gender == '男') {
          this.sex.studentSex.man++;
        } else if (item.gender == '女') {
          this.sex.studentSex.girl++;
        } else {
          this.sex.studentSex.unknown++;
        }
      })
      //学院专业班级
      let colleges = await this.$http.get('rest/colleges');
      let professions = await this.$http.get('rest/professions');
      let classes = await this.$http.get('rest/class');
      this.collegesNum = colleges.data.length
      this.professionsNum = professions.data.length
      this.classesNum = classes.data.length
      //课程，试卷
      let course = await this.$http.get('rest/course');
      let test_paper = await this.$http.get('rest/test_paper/save');//已发布的试卷
      this.courseNum = course.data.length
      this.testPpaperNum = test_paper.data.length
    }
  },
  created() {
    this.getPeopleNum()
  },

}
</script>
<style scoped>
.radius {
  border-radius: 20px;
  border: none;
  text-align: center;
  color: white;
  font-size: 40px;
  box-shadow: 0px 0px 10px 2px #cdcdcd;
  min-width: 200px;
  cursor: pointer;
}
</style>