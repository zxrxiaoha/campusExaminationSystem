<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    border
    highlight-current-row
  >
    <el-table-column label="Date" prop="date"> </el-table-column>
    <el-table-column label="学院" prop="name"> </el-table-column>
    <el-table-column label="头像" prop="logoImg">
      <template slot-scope="scope">
        <img :src="scope.row.logoImg" style="height: 3rem" />
      </template>
    </el-table-column>
    <el-table-column align="right" fixed="right" width="200px">
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
export default {
  name: "CollegeList",
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    async handleEdit(index, row) {
      this.$router.push({ path: '/admin_main/college/create', query: { id: row._id } })
    },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        let success = await this.$http.delete(`rest/colleges/${row._id}`);
        if (success.data.success) {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //加载的显示
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
      const res = await this.$http.get('rest/colleges');
      if (res.status == 200) {
        this.loading.close()
      }
      this.tableData = res.data;
    }
  },
  created() {
    this.fetch();
  },

}
</script>