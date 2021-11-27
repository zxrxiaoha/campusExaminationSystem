<template>
  <div class="school_exam">
    <div class="border">
      <van-nav-bar title="课程考试" left-text="返回" left-arrow @click-left="onClickLeft"> </van-nav-bar>
    </div>
    <ul class="introductio" v-if="flag">
      <li v-for="(item, index) in tableData" :key="item._id">
        <div class="title">{{ item.title }}</div>
        <div>开始时间：{{ item.timeStr[0] }}</div>
        <div>结束时间：{{ item.timeStr[1] }}</div>
        <div>发布时间：{{ item.date }}</div>
        <div>考试时长：{{ item.durationStr }}</div>
        <div>可重考次数：{{ item.repetition }}</div>
        <button class="btn" @click="enterClick(index)">
          进入考试<van-icon name="arrow" />
        </button>
      </li>
    </ul>
    <h2 style="text-align: center; color: #755ef5" v-else>
      当前课程未发布试卷
    </h2>
  </div>
</template>

<script>
import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
  name: 'SchoolExam',
  components: {},
  props:['id'],
  data() {
    return {
      tableData: [],
      flag:false
    };
  },
  computed: {},
  methods: {
    //点击返回
    onClickLeft(){
      this.$router.back();
    },
    enterClick(index) {
      Dialog.confirm({
        title: '考试',
        message: '是否进入考试，一旦进入不能退出',
      })
        .then(() => {
           if (!this.tableData[index].isStart) {
            Notify({
              message: '当前考试还未开始',
              type: 'primary'
            });
            return false;
          }
          if (this.tableData[index].isEnd) {
            Notify({
              message: '当前考试已结束',
              type: 'danger'
            });
            return false;
          }
          this.$router.replace({ name: 'course_test_parper', query: { id: this.tableData[index]._id } });
        })
        .catch(() => {
          console.log('取消了');
        });
    },
    async fetch() {
      //获取到所有校级已发布，并且当前学生未作答的试卷
      if (localStorage.s_user) {
        let sId = JSON.parse(localStorage.s_user).sId;
        // const res = await this.$http.get(`rest/test_paper/save/${sId}`);
        //已发布的试卷（save）,当前学生还没考的试卷（sID）,那个课程的试卷（this.id）
        const res = await this.$http.get(`rest/course_test_paper/save/${sId}/${this.id}`);
        if(res.data.length > 0){
          this.flag = true
        }
        this.tableData = res.data
        ///后面加一个参数，
      }
    },
  },
  created() {
    this.fetch();
  },
}
</script>
<style scoped>
.school_exam {
  margin-bottom: 3rem;
}
.introductio {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-evenly;
}
.introductio li {
  position: relative;
  width: 23.4375rem;
  min-width: 22.1875rem;
  height: 14.5625rem;
  border-radius: 0.9375rem;
  margin: 0.625rem;
  background: linear-gradient(to right, #816bfc, #71a5f8);
  box-shadow: 0px 0px 6px 1px #755ef5;
}
.introductio li div {
  color: #fff;
  font-size: 16px;
  padding: 10px 0 10px 10px;
}
.introductio .title {
  font-size: 20px;
  text-align: center;
  padding: 10px 0;
}
.btn {
  position: absolute;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 0.9375rem;
  padding: 0.3125rem 0.625rem;
  /* box-shadow: 0px 0px 6px 1px #95cbff; */
  color: #816bfc;
  font-weight: bold;
  bottom: 0.625rem;
  right: 0.5rem;
  font-size: 14px;
}
</style>