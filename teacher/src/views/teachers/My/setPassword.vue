<template>
  <div class="login-container1">
    <el-card header="修改密码" class="login-card">
      <el-form
        @submit.native.prevent="login('form')"
        :rules="rules"
        ref="form"
        :model="model"
      >
        <el-form-item label="教师编号：">
          <el-input v-model="model.tId" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码：" prop="old_password">
          <el-input type="password" v-model="model.old_password"></el-input>
        </el-form-item>
        <el-form-item label="修改的密码：" prop="new_password">
          <el-input type="password" v-model="model.new_password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        tId:""
      },
      data: {
      },
      rules: {
        old_password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        new_password: [{ required: true, message: '请输入修改的密码：', trigger: 'blur' }],
      }
    }
  },
  methods: {
    async getMy() {
      this.openFullScreen2();
      let res;
      try {
        res = await this.$http.get(`rest/teacher_users/teacher`);
        if (res.status == 200) {
          this.loading.close()
        }
        this.data = res.data;
        this.model.tId = res.data.tId;
      } catch (error) {
        this.loading.close()
        this.$router.replace('/teacher/login');
      }
    },
    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //修改密码特定携带的路由参数psd
          const res = await this.$http.put(`rest/teacher_users/${this.data._id}/psd`, this.model);//发请求
          if (res.data.success == true) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            localStorage.clear();
            this.$router.replace('/teacher/login')
          } else {
            this.$message({
              type: 'error',
              message: res.data.success
            });
          }
        }
      });

    },
  },
  created() {
    this.getMy()
  },

}
</script>
<style scoped>
.login-container1 {
  width: 30rem;
  margin: 0px auto;
}
.login-card {
  width: 100%;
}
</style>