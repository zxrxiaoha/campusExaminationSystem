<template>
  <div class="login-container">
    <el-card class="my_card">
      <h2>管理员登录</h2>
      <el-form
        @submit.native.prevent="login('form')"
        :rules="rules"
        ref="form"
        :model="model"
        class="login-card"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="model.username"></el-input>
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
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    //登录
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        //所有表单验证成功后进入
        if (valid) {
          const res = await this.$http.post('admin/login', this.model)
          if (!res.data.user && !res.data.token) {
            this.$message({
              type: 'error',
              message: '用户不存在或密码错误!'
            });
            return false;
          }
          //存储管理员的token
          localStorage.a_token = res.data.token;
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