<template>
  <div class="login-container">
    <el-card class="my_card">
    <h2>教师登录</h2>
    <el-form
      @submit.native.prevent="login('form')"
      :rules="rules"
      ref="form"
      :model="model"
      class="login-card"
    >
      <el-form-item label="教师编号：" prop="tId">
        <el-input v-model="model.tId"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" class="submit_button"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      rules: {
        tId: [{ required: true, message: '请输入教师编号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('teacher/login', this.model)
          if (!res.data.user && !res.data.t_token) {
            this.$message({
              type: 'error',
              message: '用户不存在或密码错误!'
            });
            return false;
          }
          // console.log(res.data);
          localStorage.t_user = JSON.stringify(res.data);//必须先吧json数据转为字符串
          // localStorage.t_user = res.data;
          this.$router.push('/');
          this.$message({
            type: "success",
            message: '登录成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '登录失败!'
          });
          return false;
        }
      });

    },
  },

}
</script>
<style>
.login-container {
  height: 100vh;
  background-color: beige;
}
.my_card {
  position: relative;
  left: 50%;
  top: 50%;
  border-radius: 30px;
  width: 500px;
  transform: translate(-50%, -50%);
}
.my_card h2 {
  text-align: center;
}
.submit_button {
  width: 100%;
  margin-top: 20px;
}
</style>