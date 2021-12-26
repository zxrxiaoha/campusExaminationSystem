<template>
  <div class="">
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
      <el-table-column label="专业" prop="name" sortable> </el-table-column>
      <el-table-column label="专业logo" prop="logoImg">
        <template slot-scope="scope">
          <img :src="scope.row.logoImg" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column align="right" fixed="right" width="200px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入专业搜索" />
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
    <div style="width: 25rem; margin: 1rem auto">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="length"
        @next-click="paging"
        @current-change="paging"
        @prev-click="paging"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfessionList",
  data() {
    return {
      tableData: [],
      search: '',
      length: 0,
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
      this.$router.push({ path: '/admin_main/profession/create', query: { id: row._id } })
    },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        let success = await this.$http.delete(`rest/professions/${row._id}`);
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
        this.paging(1)
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
      const res = await this.$http.get('rest/professions');
      if (res.status == 200) {
        this.loading.close()
      }
      this.length = res.data.length;
    },
    async paging(page) {
      const res = await this.$http.get(`rest/professions/${page}`);
      this.tableData = res.data
    },
  },
  created() {
    this.fetch();
    this.paging(1);
  },

}
</script>