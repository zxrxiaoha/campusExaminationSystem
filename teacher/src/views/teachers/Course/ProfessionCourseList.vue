<template>
  <el-table
    :data="searchResult"
    style="width: 100%"
    stripe
    border
    highlight-current-row
  >
    <el-table-column label="Date" prop="date" sortable> </el-table-column>
    <el-table-column
      label="学院"
      prop="college.name"
      sortable
    ></el-table-column>
    <el-table-column label="专业" prop="profession.name" sortable>
    </el-table-column>
    <el-table-column label="课程" prop="name" sortable> </el-table-column>
    <el-table-column label="课程图片" prop="logoImg">
      <template slot-scope="scope">
        <img :src="scope.row.logoImg" style="height: 3rem" />
      </template>
    </el-table-column>
    <el-table-column align="right" fixed="right" width="200px">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入课程搜索" />
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          type="primary"
          >编辑</el-button
        >
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
// import StudentList from './StudentList.vue'
export default {
  // components: { StudentList },
  name: "CourseList",
  data() {
    return {
      tableData: [],
      search: '',
      // dialogTableVisible: false,
      // name:''
      // length: 0,
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
    // dblclick(row, column, cell, event) {
    //   // this.name = row.name;
    //   // this.dialogTableVisible = true;
    // } ,
    async handleEdit(index, row) {
      this.$router.push({ path: '/teacher_main/profession_course/create', query: { id: row._id } })
    },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        let res = await this.$http.delete(`rest/profession_course/${row._id}`);
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message({
            type: 'info',
            message: '删除失败!'
          });
        }
        this.fetch();
        // this.paging(1);
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
      this.openFullScreen2();
      let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
      if (tId) {
        const res = await this.$http.get('rest/profession_course/teacher/' + tId);
        if (res.status == 200) {
          this.loading.close()
        }
        this.tableData = res.data
      }


    },
  },
  created() {
    this.fetch();
  },

}
</script>