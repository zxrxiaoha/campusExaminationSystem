<template>
  <el-table
    :data="searchResult"
    style="width: 100%"
    v-if="!str"
    stripe
    border
    highlight-current-row
  >
    <el-table-column label="Date" prop="date"> </el-table-column>
    <el-table-column label="用户名" prop="name"> </el-table-column>
    <!-- <el-table-column label="密码" prop="password"> </el-table-column> -->
    <el-table-column label="头像" prop="icon">
      <template slot-scope="scope">
        <img :src="scope.row.icon" style="height: 3rem" />
      </template>
    </el-table-column>
    <el-table-column align="right" fixed="right" width="200px">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入用户名搜索" />
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
  <h1 v-else class="font">{{ str }}</h1>
</template>

<script>
export default {
  name: "AdminList",
  data() {
    return {
      tableData: [],
      search: "",
      str: '',
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
    async handleEdit(index, row) {
      this.$router.push({ path: '/admin_main/admin/create', query: { id: row._id } })
    },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        let success = await this.$http.delete(`rest/admin_users/${row._id}`);
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
      const res = await this.$http.get('rest/admin_users');
      if (res.status == 200) {
        this.loading.close()
      }
      if (typeof res.data == "string") {
        this.str = res.data
      } else {
        this.tableData = res.data;
      }
    }
  },
  created() {
    this.fetch();
  },

}
</script>
<style>
.font {
  font-size: 2rem;
}
</style>