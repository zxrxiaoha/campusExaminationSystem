<template>
  <div class="home">
    <div class="border"><van-nav-bar title="首页"> </van-nav-bar></div>
    <van-tabs v-model="active" color="#7967f4" title-active-color="#7967f4">
      <van-tab title="课程考试"><ProfessionCourse /></van-tab>
      <van-tab title="校级考试"><SchoolCourse /></van-tab>
      <van-tab title="查看已考"><FenLei /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ProfessionCourse from './child/course/ProfessionCourse.vue'
import SchoolCourse from './child/school/SchoolCourse.vue'
import FenLei from './child/accomplish/FenLei.vue';
export default {
  name: 'Home',
  components: { ProfessionCourse, SchoolCourse, FenLei },
  data() {
    return {
      active: '',
    };
  },
  computed: {
  },
  watch: {
    active(value) {
      sessionStorage.setItem('active', value);
    }
  },
  methods: {
    async fetch() {
      let res = await this.$http.get('rest/student_user/student');
      localStorage.personalDetails = JSON.stringify(res.data);
    }
  },
  created() {
    if (sessionStorage.getItem('active') != null) {
      this.active = sessionStorage.getItem('active') - 0;
    }
    this.fetch();
  },
}
</script>
<style scoped>
.border {
  border-bottom: 1px solid #ccc;
}
</style>