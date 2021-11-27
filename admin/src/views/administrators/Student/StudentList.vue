<template>
  <div>
    <h2 style="color: #67c23a">双击查看详情：</h2>
    <div style="margin: 20px"></div>
    <el-table
      :data="searchResult"
      style="width: 100%"
      stripe
      border
      highlight-current-row
       @cell-dblclick="dblclick"
    >
      <el-table-column label="Date" prop="date"> </el-table-column>
      <el-table-column label="姓名" prop="name"> </el-table-column>
      <el-table-column label="编号" prop="sId"> </el-table-column>
      <!-- <el-table-column label="密码" prop="password"> </el-table-column> -->
      <el-table-column label="头像" prop="icon">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender"> </el-table-column>
      <el-table-column label="年龄" prop="age"> </el-table-column>
      <el-table-column align="right" fixed="right" width="150px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
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
        hide-on-single-page
      >
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="60%">
      <h2 style="color: #67c23a">个人信息：</h2>
      <div style="margin: 20px"></div>
      <el-form label-width="120px" ref="form" :model="model" class="box_red">
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            disabled
          >
            <img v-if="model.icon" :src="model.icon" class="avatar"  style="width:178px"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号：">
              <el-input
                v-model="model.sId"
                type="number"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="model.name"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
              <el-radio v-model="model.gender" label="男" disabled>男</el-radio>
              <el-radio v-model="model.gender" label="女" disabled>女</el-radio>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker
                v-model="model.introductionToThe.dateOfBirth"
                type="date"
                :clearable="false"
                readonly
                placeholder="值为空"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input
                v-model="model.age"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学院：">
              <el-input
                v-model="model.college.name"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
            <el-form-item label="专业：">
              <el-input
                v-model="model.profession.name"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
            <el-form-item label="班级：">
              <el-input
                v-model="model.class.name"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话号码：" prop="phone">
              <el-input
                v-model="model.introductionToThe.phone"
                placeholder="值为空"
                type="number"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input
                v-model="model.introductionToThe.eMain"
                readonly
                placeholder="值为空"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentList",
  data() {
    return {
      tableData: [],
      search: '',
      length: 0,
      dialogTableVisible: false,
      model: {
        introductionToThe: {},
        college: {},
        profession: {},
        class: {}
      }
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
     //双击
    async dblclick(row, column, cell, event) {
      if(!row.college){//可以只判断学院
        return false;
      }
      this.dialogTableVisible = true;
      this.model = row;
    },
    async handleEdit(index, row) {
      this.$router.push({ path: '/admin_main/student/create', query: { id: row._id } })
    },
    handleDelete(row) {
      this.$confirm(`是否删除此条数据?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(async () => {
        let success = await this.$http.delete(`rest/student_users/${row._id}`);
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
      const res = await this.$http.get('rest/student_users');
      if (res.status == 200) {
        this.loading.close()
      }
      this.length = res.data.length;
    },
    async paging(page) {
      const res = await this.$http.get(`rest/student_users/${page}`);
      this.tableData = res.data
    },
  },
  created() {
    this.fetch();
    this.paging(1);
  },

}
</script>