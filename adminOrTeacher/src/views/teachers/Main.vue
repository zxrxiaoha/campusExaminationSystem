<template>
  <div>
    <el-row :gutter="40" style="margin: 30px 0">
      <el-col :span="8" @click.native="$router.push('profession_course/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #91cc75"
        >
          <i class="el-icon-notebook-2"></i>
          <div style="font-size: 20px">课程个数：{{courseNum}}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('course_published_papers/list')">
        <el-card
          shadow="always"
          class="radius"
          style="background-color: #f89183"
        >
          <i class="el-icon-document"></i>
          <div style="font-size: 20px">已发试卷：{{testPpaperNum}}</div>
        </el-card>
      </el-col>
      <el-col :span="8" @click.native="$router.push('course_grade/list')">
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
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      courseNum:0,
      testPpaperNum:0
    };
  },
  methods: {
    async getPeopleNum() {
     let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
      if (tId) {
        const courseNum = await this.$http.get('rest/profession_course/teacher/' + tId);
        this.courseNum = courseNum.data.length;
        const testPpaperNum = await this.$http.get('rest/course_test_paper/save/'+tId);//查询当前老师已发布的试卷
        this.testPpaperNum = testPpaperNum.data.length;
      }
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