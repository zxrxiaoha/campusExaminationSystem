<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-back"
      round
      style="margin-bottom: 20px"
      @click="$router.back()"
      >返回</el-button
    >
    <span class="course">{{ courseName }}</span>
    <el-table
      :data="searchResult"
      style="width: 100%"
      stripe
      border
      highlight-current-row
    >
      <el-table-column label="姓名" prop="name"> </el-table-column>
      <el-table-column label="学号" prop="sId"> </el-table-column>
      <el-table-column label="试卷" prop="course_test_paper.title"> </el-table-column>
      <el-table-column label="成绩" prop="score"></el-table-column>
      <el-table-column align="right" fixed="right" width="150px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentList",
  props: ['id'],
  data() {
    return {
      tableData: [],
      search: '',
      courseName: ''
    }
  },
  computed: {
    //搜索，toLowerCase：将字符串转为小写
    searchResult() {
      return this.tableData.filter(data => {
        return !this.search || data.name.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/course_test_paper_score/profession_course/${this.id}`);
      this.tableData = res.data;
    },
    async getCourseName() {
      const res = await this.$http.get('rest/profession_course/' + this.id);
      this.courseName = res.data.name;
      console.log(this.courseName);
    }
  },
  created() {
    this.fetch();
    this.getCourseName()
  },

}
</script>
<style  scoped>
.course {
  position: absolute;
  color: #67c23a;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  left: 50%;
}
</style>