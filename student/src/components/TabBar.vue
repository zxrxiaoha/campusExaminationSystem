<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" replace to="/main/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" replace to="/main/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import Home from '../views/home/Home.vue'
export default {
  name: 'TabBar',
  components: { Home },
  data() {
    return {
    };
  },
  computed: {},
}
</script>
<style scoped>
</style>