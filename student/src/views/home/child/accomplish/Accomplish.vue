<template>
  <!-- 已完成的试卷 -->
  <div class="school_exam">
    <div class="border">
      <van-nav-bar
        title="已考试卷"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
    <ul class="introductio" v-if="test_paper">
      <li v-for="(item, index) in tableData" :key="item._id">
        <div class="title">{{ item.title ? item.title : item.name }}</div>
        <div>开始时间：{{ item.timeStr[0] }}</div>
        <div>结束时间：{{ item.timeStr[1] }}</div>
        <div>发布时间：{{ item.date }}</div>
        <div>考试时长：{{ item.durationStr }}</div>
        <div>可重考次数：{{ item.repetition }}</div>
        <div class="score" v-if="item.isTotal">
          考试得分：{{ testParper[index].score }}
        </div>
        <button class="btn" @click="enterClick(index)">
          查看详情<van-icon name="arrow" />
        </button>
      </li>
    </ul>
    <h2 style="text-align: center; color: #755ef5" v-else>
      当前还没有已考试卷，空空如也
    </h2>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Notify } from 'vant';
export default {
  name: 'Accomplish',
  props: ['name', 'id'],//课程的id
  components: {},
  data() {
    return {
      tableData: [],//已考试卷详情
      testParper: [],//已考试卷分数和详情
      test_paper: false
    };
  },
  methods: {
    //点击返回
    onClickLeft() {
      this.$router.back();
    },
    enterClick(index) {
      Dialog.confirm({
        title: '详情',
        message: '是否进入查看详情',
      })
        .then(() => {
          //判断是否可以查看试卷
          // if (this.testParper[index].test_paper.isInspect) {
          //   this.$router.push({ name: 'accomplish_test_parper', query: { id: this.testParper[index]._id } });
          // } 
          if (this.testParper[index].test_paper && this.testParper[index].test_paper.isInspect) {
            this.$router.push({ name: 'accomplish_test_parper', query: { id: this.testParper[index]._id } });
          } else if (this.testParper[index].course_test_paper && this.testParper[index].course_test_paper.isInspect) {
            this.$router.push({ name: 'accomplish_test_parper', query: { id: this.testParper[index]._id } });
          }
          else {
            Notify({ type: 'warning', message: '该试卷不允许查看！' });
          }
          // 
        })
        .catch(() => {
          console.log('取消了');
        });

    },
    async fetch() {
      //获取到所有校级已发布，并且当前学生作答的试卷
      if (localStorage.s_user) {
        let sId = JSON.parse(localStorage.s_user).sId;
        if (this.name == 'profession') {
          const res = await this.$http.get(`rest/course_test_paper_score/${sId}/${this.id}`);
          if (res.data.length > 0) {
            this.test_paper = true;
            this.testParper = res.data;
            res.data.forEach(item => {
              this.test_paper = true;
              this.tableData.push(item.course_test_paper)
            });
          }
        } else if (this.name == 'school') {
          const res = await this.$http.get(`rest/test_paper_score/${sId}/${this.id}`);
          if (res.data.length > 0) {
            this.test_paper = true;
            this.testParper = res.data;
            res.data.forEach(item => {
              this.test_paper = true;
              this.tableData.push(item.test_paper)
            });
          }
        }

      } else {
        this.$router.replace('/student/login')
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
  /* height: 233px; */
  border-radius: 0.9375rem;
  margin: 0.625rem;
  /* background: linear-gradient(to right, #a2beeb, #755ef5);
  box-shadow: 0px 0px 6px 1px #755ef5; */
  box-shadow: 0px 0px 6px 1px #38c8fb;
  background: linear-gradient(to right, #2980b9, #38c8fb);
}
.introductio li div {
  color: #fff;
  font-size: 16px;
  padding: 10px 0 7px 10px;
}
.introductio .title {
  font-size: 20px;
  text-align: center;
  padding: 10px 0 4px 0;
}
.btn {
  position: absolute;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 0.9375rem;
  padding: 0.3125rem 0.625rem;
  /* box-shadow: 0px 0px 6px 1px #95cbff; */
  color: #2980b9;
  font-weight: bold;
  bottom: 10px;
  right: 0.5rem;
  font-size: 14px;
}
</style>