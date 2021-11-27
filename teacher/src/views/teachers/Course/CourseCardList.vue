<template>
  <div>
    <h2 style="margin:20px 0;color:#67c23a;text-align: center;">点击查看课程中的学生</h2>
    <h2 v-if="show">当前还没有添加课程</h2>
    <div class="course" v-else>
      <ul class="courseItem">
        <li
          v-for="item in courseData"
          :key="item.name"
          @click="courseClick(item)"
        >
          <img :src="item.logoImg" alt="" v-if="item.logoImg" />
          <img src="~assets/img/zipper.png" alt="" v-else />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'courseCardList',
  components: {},
  data() {
    return {
      courseData: [],
      show: false
    };
  },
  methods: {
    async fetch() {
      // this.openFullScreen2();
      let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
      if (tId) {
        const res = await this.$http.get('rest/profession_course/teacher/' + tId);
        if (res.status == 200) {
          // this.loading.close()
        }
        if (!res.data.length) {
          this.show = true
        }
        this.courseData = res.data
      }
    },
    async courseClick(item) {
      this.$router.push({ path: '/teacher_main/course_student/list', query: { name: item.name } })
    }
  },
  computed: {},
  created() {
    this.fetch();
  },
}
</script>
<style scoped>
.course .courseItem li {
  list-style: none;
}
.courseItem {
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.courseItem > li {
  height: 300px;
  width: 300px;
  min-width: 300px;
  margin: 10px;
  /* margin-bottom: 20px; */
  position: relative;
  /* box-shadow: 0px 9px 17px 2px #a8a9a5;    */
  background-color: #63b5ef;
  border-radius: 20px;
}
.courseItem > li > img {
  position: absolute;
  width: 200px;
  top: 9%;
  left: 50%;
  transform: translate(-50%);
}
.courseItem > li > p {
  margin: 0;
  width: 100%;
  position: absolute;
  bottom: 9%;
  left: 50%;
  transform: translate(-50%);
  font-weight: bold;
  font-size: 2rem;
  color: white;
  text-align: center;
}
.courseItem > li:nth-child(1) {
  background-color: #63b5ef;
}
.courseItem > li:nth-child(2) {
  background-color: #92cb7b;
}
.courseItem > li:nth-child(3) {
  background-color: #efd07c;
}
.courseItem > li:nth-child(4) {
  background-color: #9872e0;
}
.courseItem > li:nth-child(5) {
  background-color: #f89183;
}
.courseItem > li:hover {
  /* border: 3px solid yellow; */
  box-shadow: 0px 9px 17px 2px #a8a9a5;
  cursor: pointer;
}
</style>