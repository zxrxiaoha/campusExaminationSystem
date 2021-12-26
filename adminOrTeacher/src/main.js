import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './network/index'
import './plugins/element_ui'

Vue.config.productionTip = false
Vue.prototype.$http = http//给vue原型上添加一个$http属性，用来发送请求，所有组件也都有了这个属性
Vue.mixin({
  computed: {
    //图片上传地址
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    //获取请求头
    getAuthHeaders() {
      return {
        Authorization: `${localStorage.a_token || ''}`
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
  render: h => h(App)
}).$mount('#app')