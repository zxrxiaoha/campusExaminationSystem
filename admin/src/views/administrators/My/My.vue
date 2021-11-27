<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    border
    highlight-current-row
  >
    <el-table-column label="创建时间" prop="date"> </el-table-column>
    <el-table-column label="用户名" prop="name"> </el-table-column>
    <el-table-column label="头像" prop="icon">
      <template slot-scope="scope">
        <img :src="scope.row.icon" style="height: 3rem" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "AdminList",
  data() {
    return {
      tableData: [],
      search: ""
    }
  },
  methods: {
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
      const res = await this.$http.get(`rest/admin_users/admin`);
      if (res.status == 200) {
        this.loading.close()
      }
      this.tableData.push(res.data);
    }
  },
  created() {
    this.fetch();
  },

}
</script>
<style>
.el-form-item__label {
  color: #409eff;
}
</style>