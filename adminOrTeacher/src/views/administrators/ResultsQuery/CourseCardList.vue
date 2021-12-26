<template>
  <div class="class">
    <el-button type="primary" icon="el-icon-back" round class="back" @click="$router.back()">返回</el-button>
    <ul class="course">
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
</template>

<script>
export default {
  props: ['classes','college','profession'],
  name: 'courseCardList',
  components: {},
  data() {
    return {
      courseData: []
    };
  },
  methods: {
    async fetch() {
      const course = await this.$http.get('rest/course');
      if (!course.data) {
        return;
      }
      this.courseData = course.data;
      
    },
    courseClick(item) {
      this.$router.push({path:'/admin_main/class_score/list',query:{college:this.college,profession:this.profession,class:this.classes,course:item._id}})
    }
  },
  computed: {},
  created() {
    this.fetch();
  },
}
</script>
<style scoped>
.course li {
  list-style: none;
}
.course {
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.course > li {
  height: 300px;
  width: 300px;
  min-width: 300px;
  /* margin-bottom: 20px; */
  margin:10px;
  position: relative;
  border-radius: 20px;
  /* box-shadow: 0px 9px 17px 2px #a8a9a5;    */
}
.course > li > img {
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;
  top: 9%;
  left: 50%;
  transform: translate(-50%);
}
.back {
  margin-left: 20px;
  margin-bottom: 20px;
  box-shadow: 3px 4px 9px 0px #969b9f;
}
.course > li > p {
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
.course > li:nth-child(1) {
  background-color: #63b5ef;
}
.course > li:nth-child(2) {
  background-color: #92cb7b;
}
.course > li:nth-child(3) {
  background-color: #efd07c;
}
.course > li:nth-child(4) {
  background-color: #9872e0;
}
.course > li:nth-child(5) {
  background-color: #f89183;
}
.course > li:hover {
  /* border: 3px solid yellow; */
  box-shadow: 0px 9px 17px 2px #a8a9a5;
  cursor: pointer;
}
</style>