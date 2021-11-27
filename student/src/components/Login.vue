<template>
  <div class="login">
    <div class="border"><van-nav-bar title="登录"> </van-nav-bar></div>
    <div class="loginItem">
      <van-form @submit="login">
        <div class="borderItem">
          <van-field
            v-model="model.sId"
            name="sId"
            label="学号："
            placeholder="sId"
            :rules="[{ required: true, message: '请填写学号' }]"
          />
        </div>
        <div class="borderItem">
          <van-field
            v-model="model.password"
            type="password"
            name="password"
            label="密码："
            placeholder="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </div>
        <div class="password">
          <span>忘记密码了？</span>
          <span @click="forgotPassword">找回密码</span>
        </div>
        <div style="margin: 25px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="#9373ff"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      model: {
      }
    };
  },
  computed: {},
  methods: {
    forgotPassword(){
      console.log('找回密码')
    },
    async login(values) {
      // if (!values || !values.sId || !values.password) {
      //   Notify({ type: 'warning', message: '请填写学号或密码' });
      //   return;
      // }
      const res = await this.$http.post('student/login', this.model)
      if (!res.data.user) {
        Notify({ type: 'warning', message: '账号密码不存在或错误' });
        return;
      }
      localStorage.s_user = JSON.stringify(res.data.user);
      localStorage.s_token = res.data.user.s_token;
      let introductionToThe = res.data.user;//详情
      if (introductionToThe) {
        if (!introductionToThe.college || !introductionToThe.profession || !introductionToThe.class) {
          this.$router.replace('/main/my');
        } else {
          this.$router.replace('/');
        }
      }else{
        this.$router.replace('/main/my');
      }
      Notify({
        message: '登录成功',
        color: '#FFF',
        background: '#9373ff',
      });
    },
  },
}
</script>
<style scoped>
.border {
  border-bottom: 1px solid #ccc;
}
.login {
  height: 100vh;
  background-color: #fff;
}
.loginItem {
  margin: 100px 0;
}
.borderItem {
  border-bottom: 1px solid #9373ff;
  margin: 25px;
}
.password {
  text-align: right;
  margin: 25px;
}
.password span:nth-of-type(1) {
  color: #ccc;
}
.password span:nth-of-type(2) {
  color: #9373ff;
  font-weight: bold;
  cursor: pointer;
}
</style>