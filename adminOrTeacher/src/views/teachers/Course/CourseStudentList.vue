<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    border
    highlight-current-row
  >
    <el-table-column label="Date" prop="date"> </el-table-column>
    <el-table-column label="课程" prop="profession_course.name" sortable>
    </el-table-column>
    <el-table-column label="姓名" prop="studentName"> </el-table-column>
    <el-table-column label="学生学号" prop="sId"> </el-table-column>
    <el-table-column align="right" fixed="right" width="150px">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
      </template>
      <template slot-scope="scope">
        <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            >编辑</el-button
          > -->
        <el-button
          size="mini"
          type="danger"
          style="margin-top: 0.5rem"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['name'],
  name: "StudentList",
  data() {
    return {
      tableData: [],
      search: '',
    }
  },
  methods: {
    // async handleEdit(index, row) {
    //   this.$router.push({ path: '/teacher_main/student/create', query: { id: row._id } })
    // },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        let success = await this.$http.delete(`rest/course_student/${row._id}`);
        if (success.data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        } else {
          this.$message({
            type: 'info',
            message: '删除失败!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    async fetch() {
      // this.openFullScreen2();
      let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
      if (tId) {
        //获取当前老师课程
        const res = await this.$http.get('rest/course_student/' + tId);
        // console.log(res.data);
        if (res.status == 200) {
          // this.loading.close()
        }
        this.tableData = [];
        res.data.forEach(async item => {
          if (item.profession_course.name == this.name) {
            //过滤出来与当前点击相同的课程名里面的学生
            let student = await this.$http.get(`rest/student_users/${item.sId}`);
            item.studentName = student.data[0].name;
            this.tableData.push(item)
          }
        })
      }
    },
  },
  created() {
    this.fetch();
  },

}
</script>