<template>
  <div>
    <!-- 路由的缓存，include表示只缓存My路由 -->
    <keep-alive :include="['My']">
      <router-view />
    </keep-alive>
    <TabBar />
  </div>
</template>

<script>
import TabBar from '../components/TabBar.vue'
export default {
  name: 'Main',
  components: { TabBar },
  data() {
    return {

    };
  },
  computed: {},
}
</script>
<style scoped>
</style>