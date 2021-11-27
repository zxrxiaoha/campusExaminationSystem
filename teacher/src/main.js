import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './network/index'
import './plugins/element_ui'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      if (localStorage.t_user) {
        return {
          Authorization: `${JSON.parse(localStorage.t_user).t_token}`
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
        this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')