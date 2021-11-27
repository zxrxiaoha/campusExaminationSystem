<template>
  <div class="login">
    <div class="border"><van-nav-bar title="修改密码"> </van-nav-bar></div>
    <div class="loginItem">
      <van-form @submit="editPassword">
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
            v-model="model.old_password"
            type="password"
            name="password"
            label="原密码："
            placeholder="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </div>
        <div class="borderItem">
          <van-field
            v-model="model.new_password"
            type="password"
            name="password"
            label="新密码："
            placeholder="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </div>
        <div style="margin: 25px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="#9373ff"
            >修改</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  props: ['sId'],
  name: 'Login',
  data() {
    return {
      model: {
      },
      data: {}
    };
  },
  methods: {
    async editPassword() {
      //修改密码特定携带的路由参数psd
      const res = await this.$http.put(`rest/student_users/${this.data._id}/psd`, this.model);//发请求
      if(res.data.success == true){
        Notify({ type: 'primary', message: '修改成功' });
        localStorage.clear();
        this.$router.replace('/student/login')
      }else{
        Notify({ type: 'warning', message: res.data.success });
      }
    },
    async getMy() {
      const res = await this.$http.get(`rest/student_users/student`);//自定义携带的参数
      this.data = res.data;
      this.model.sId = res.data.sId;
    }
  },
   created() {
    this.model.sId = this.sId;
    this.getMy();
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