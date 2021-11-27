<template>
  <div class="course_exam">
    <ul class="course_introductio">
      <li v-for="(item, index) in courses">
        <div class="left">
          <img v-if="item.logoImg" :src="item.logoImg" alt="" />
          <img v-else src="~assets/img/none.png" />
        </div>
        <div class="right">
          <div>课程：{{ item.name }}</div>
          <div>作者：{{ item.writer }}</div>
          <button class="btn" @click="courseClick(index)">
            进入课程<van-icon name="arrow" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProfessionCourse',
  components: {},
  data() {
    return {
      courses: []
    };
  },
  computed: {},
  methods: {
    courseClick(index) {
      this.$router.push('/main/course_exam/' + this.courses[index]._id);
    },
    async fetch() {
      if (localStorage.s_user) {
        let sId = JSON.parse(localStorage.s_user).sId
        // let college = JSON.parse(localStorage.s_user).college
        // let profession = JSON.parse(localStorage.s_user).profession
        // let classes = JSON.parse(localStorage.s_user).class
        let res = await this.$http.get('rest/course_student/student/'+sId);//获取学是的课程
        this.courses = res.data
      } else {
        this.$router.replace('/student/login');
      }

    }
  },
  created() {
    this.fetch()
  },
}
</script>
<style scoped>
.course_exam {
  margin-bottom: 3rem;
}
.course_introductio {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-evenly;
}
.course_introductio li {
  display: flex;
  width: 23.4375rem;
  min-width: 22.1875rem;
  height: 6.9375rem;
  border-radius: 20px;
  margin: 0.625rem;
  background: linear-gradient(to right, #816bfc, #71a5f8);
  box-shadow: 0px 0px 6px 1px #71a5f8;
  /* box-shadow: 0px 0px 6px 1px #23236a; */
  /* background-color: #23236a; */
}
.course_introductio li .left {
  width: 30%;
  height: 100%;
  position: relative;
}
.course_introductio li .right {
  width: 70%;
  height: 100%;
  position: relative;
}
.course_introductio li .left img {
  width: 90%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.right div {
  position: absolute;
  color: #fff;
  font-size: 1.125rem;
}
.right div:nth-of-type(1) {
  width: 90%;
  top: 10px;
  overflow: hidden;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0.3125rem 0.625rem 0 0.625rem;
}
.right div:nth-of-type(2) {
  padding: 0.3125rem 0.625rem 0.3125rem 0.625rem;
  bottom: 0.8125rem;
}
.right .btn {
  position: absolute;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 20px;
  padding: 0.3125rem 0.625rem;
  /* box-shadow: 0px 0px 6px 1px #f2c94c; */
  color: #816bfc;
  font-weight: bold;
  bottom: 0.625rem;
  right: 0.5rem;
  font-size: 14px;
}
</style>