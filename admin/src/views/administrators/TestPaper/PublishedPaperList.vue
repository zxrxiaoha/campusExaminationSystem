<template>
  <div>
    <!-- 已发布试卷 -->
    <el-table
      :data="searchResult"
      style="width: 100%"
      stripe
      border
      highlight-current-row
    >
      <el-table-column
        label="Date"
        prop="date"
        sortable
        width="150px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="课程"
        prop="course.name"
        width="200px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="试卷标题"
        prop="name"
        width="300px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="考试开始时间"
        prop="timeStr[0]"
        sortable
        width="200px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="考试结束时间"
        prop="timeStr[1]"
        sortable
        width="200px"
        align="center"
      >
      </el-table-column>
      <el-table-column label="状态" prop="isEnd" width="110px" align="center">
        <template slot-scope="scope">
          <div :class="{zc:!scope.row.isEnd,gq:scope.row.isEnd}">{{scope.row.isEnd?'过期':'正常'}}</div>
          <!-- <div>{{scope.row.isEnd}}</div> -->
        </template>
      </el-table-column>
      <el-table-column
        label="考试时长"
        prop="durationStr"
        sortable
        width="110px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="试卷总分"
        prop="total"
        sortable
        width="110px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="试卷题数"
        prop="number"
        sortable
        width="110px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="单选题数"
        prop="singleTopicSelection.length"
        sortable
        width="110px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="多选题数"
        prop="multipleChoice.length"
        sortable
        width="110px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="判断题数"
        prop="trueFalse.length"
        sortable
        width="110px"
        align="center"
      >
      </el-table-column>
      <el-table-column align="right" fixed="right" width="150px">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入时间标题搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
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
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherList",
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
    },

  },
  methods: {
    //编辑
    async handleEdit(index, row) {
      this.$router.push({ path: '/admin_main/test_paper/create', query: { id: row._id } })
    },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        row.isSave = false;
        let success = await this.$http.put(`rest/test_paper/${row._id}`, row);
        if (success.status >= 200 && success.status < 300) {
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
        this.paging(1);
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
      const res = await this.$http.get('rest/test_paper/save');//已发布的试卷
      if (res.status == 200) {
        this.loading.close()
      }
      // this.tableData = res.data
      this.length = res.data.length;
    },
    async paging(page) {
      const res = await this.$http.get(`rest/test_paper/save/${page}`);
      this.tableData = res.data
    },
  },
  created() {
    this.fetch();
    this.paging(1);
  },

}
</script>
<style  scoped>
  .zc{
    color: #67c23a;
    font-weight: bold;
  }
  .gq{
    color: red;
    font-weight: bold;
  }
</style>