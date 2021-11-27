import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import http from './network/http';
import { Notify } from 'vant';
Vue.config.productionTip = false
Vue.prototype.$http = http
// Vue.prototype.$bus = new Vue()
Vue.mixin({
  methods: {
    getAuthHeaders() {
      if (localStorage.s_user) {
        return {
          Authorization: `${JSON.parse(localStorage.s_user).s_token}`
        }
      } else {
        return {
          Authorization: ''
        }
      }

    },
    //图片的验证
    beforeAvatarUpload(file) {
      const imgType = ['image/jpeg', 'image/png']
      const isJPG = imgType.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        Notify({ type: 'warning', message: '上传头像图片只能是 JPG 格式或 PNG 格式!' });
      }
      if (!isLt2M) {
        Notify({ type: 'warning', message: '上传头像图片大小不能超过 2MB!' });
      }
      return isJPG && isLt2M;
    },
  }
})
new Vue({
  router,
  render: h => h(App),
  // beforeCreate() {
  //   //安装全局事件总线
  //   Vue.prototype.$bus = this
  // },
}).$mount('#app')