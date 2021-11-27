<template>
  <div>
    <div class="border">
      <van-nav-bar
        title="考试"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
    <div id="dati">
      <van-button color="#7232dd" class="save" @click="save">保存</van-button>
      <van-form @submit="onSubmit">
        <div class="top">
          <div>倒计时{{ test_parper.durationStr }}</div>
          <div><van-icon name="apps-o" /></div>
        </div>
        <div class="bottom">
          <!-- 单选题 -->
          <div
            class="singleTopicSelection"
            v-for="(item, index) in test_parper.singleTopicSelection"
            :key="item.title"
          >
            <div class="tixing">单选题</div>
            <div class="title">{{ index + 1 }}、{{ item.title }}</div>
            <van-field name="radio">
              <template #input>
                <van-radio-group
                  v-model="model.singleTopicSelection[item.index - 1]"
                >
                  <van-radio
                    :name="singleItem"
                    v-for="(singleItem, singleIndex) in item.arr"
                    checked-color="#755ef5"
                    style="margin-bottom: 20px"
                    >{{ singleItem }}.{{ item[singleItem] }}
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>

          <!-- 多选题 -->
          <div
            class="multipleChoice"
            v-for="(item, index) in test_parper.multipleChoice"
            :key="item.title"
          >
            <div class="tixing">多选题</div>
            <div class="title">{{ index + 1 }}、{{ item.title }}</div>
            <van-field name="checkboxGroup">
              <template #input>
                <van-checkbox-group
                  v-model="model.multipleChoice[item.index - 1]"
                >
                  <van-checkbox
                    shape="square"
                    v-for="(multipleItem, multipleIndex) in item.arr"
                    style="margin-bottom: 20px"
                    checked-color="#755ef5"
                    :name="multipleItem"
                    >{{ multipleItem }}.{{ item[multipleItem] }}</van-checkbox
                  >
                </van-checkbox-group>
              </template>
            </van-field>
          </div>
          <!-- 判断题 -->
          <div
            class="trueFalse"
            v-for="(item, index) in test_parper.trueFalse"
            :key="item.title"
          >
            <div class="tixing">判断题</div>
            <div class="title">{{ index + 1 }}、{{ item.title }}</div>
            <van-field name="radio">
              <template #input>
                <van-radio-group v-model="model.trueFalse[item.index - 1]">
                  <van-radio
                    name="1"
                    checked-color="#755ef5"
                    style="margin-bottom: 20px"
                    >A.对</van-radio
                  >
                  <van-radio
                    name="0"
                    checked-color="#755ef5"
                    style="margin-bottom: 20px"
                    >B.错</van-radio
                  >
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <div style="margin: 16px">
            <van-button round block color="#755ef5" native-type="submit"
              >提交</van-button
            >
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
  name: 'TestParper',
  components: {},
  props: ['id'],
  data() {
    return {
      test_parper: {},
      time: '',
      model: {
        singleTopicSelection: [],
        multipleChoice: [],
        trueFalse: [],
      },
      total_points: 0,//总成绩
      flag: true,//控制是否可提交，默认可以
    };
  },
  methods: {
    onClickLeft() {
      Dialog.confirm({
        title: '返回',
        message: '是否确认退出，退出则自动交卷',
      })
        .then(() => {
          this.autoSubmit();//点击返回自动提交
        })
        .catch(() => {
          console.log('取消了');
        });
    },
    //格式化时间
    getFormatDuringTime(during) {
      var s = Math.floor(during / 1) % 60;
      during = Math.floor(during / 60);
      var i = during % 60;
      during = Math.floor(during / 60);
      var h = during % 24;
      if (s < 10) {
        s = '0' + s;
      }
      if (i < 10) {
        i = '0' + i;
      }
      if (h < 10) {
        h = '0' + h
      }
      this.test_parper.durationStr = h + ':' + i + ':' + s;
      //每次都进去
      sessionStorage.setItem('duration', this.test_parper.durationStr)
    },
    //定时器
    durationStr() {
      //不用怕session被改，因为一秒保存一次，根本改不了,即使改了，在改回来就好了
      this.time = this.test_parper.durationStr;//这是数据库发过来的
      if (sessionStorage.getItem('duration')) {
        if (sessionStorage.getItem('duration') > this.time) {
          this.test_parper.durationStr = this.time;
        } else {
          this.test_parper.durationStr = sessionStorage.getItem('duration');
        }

      }
      let strArr = this.test_parper.durationStr.split(":");
      let hour = strArr[0];
      let minute = strArr[1];
      let second = strArr[2];
      let time = ((hour * 60 * 60) + (minute * 60) + second * 1);//秒 
      if (time == 0 && this.flag) {
        this.autoSubmit()//时间到了就自动提交
        this.flag = false;
        return;
      }
      this.dsq = setInterval(() => {
        time = time - 1
        // console.log(time);
        this.getFormatDuringTime(time)
        if (time <= 0) {
          clearInterval(this.dsq);
          //提交试卷
          if (this.flag) {
            this.autoSubmit()//时间到了就自动提交
          }
        }
      }, 1000);

    },
    //自动提交试卷的函数
    async autoSubmit() {
      //每次提交钱都把，分数清一下
      this.total_points = 0;
      //在这里校验答案，后面在写，服务器没有发送过来答案，老师批改，现在暂时不写
      let student = await this.$http.get('/rest/student_user/' + JSON.parse(localStorage.s_user).id);
      // console.log(student.data);//获取学生个人信息
      //遍历单选题,没有打乱的前提
      this.test_parper.singleTopicSelection.forEach((item, index) => {
        //回答正确，成绩追加
        if (item.radio == this.model.singleTopicSelection[index]) {
          this.total_points += Number(item.score);
          // console.log(true);
        }
      })
      //遍历多选题,没有打乱的前提
      this.test_parper.multipleChoice.forEach((item, index) => {
        //回答正确，成绩追加
        //先判断选中的答案是否和正确的答案长度相同
        // console.log(item.checked);//正确答案
        // console.log(this.model.multipleChoice[index]);
        // if (this.model.multipleChoice[index] == undefined || this.model.multipleChoice[index].length == 0) {
        //   console.log('unde');
        //   Notify({ type: 'warning', message: `当前多选题第${index + 1}题未作答的题` });
        // }
        if (this.model.multipleChoice[index] && this.model.multipleChoice[index].length == item.checked.length) {
          //然后在进行数组的排序，后在转为字符串在比较
          this.model.multipleChoice[index].sort();
          item.checked.sort();
          if (this.model.multipleChoice[index].toString() == item.checked.toString()) {
            this.total_points += Number(item.score);
          }
        }
      })
      //遍历判断题,没有打乱的前提
      this.test_parper.trueFalse.forEach((item, index) => {
        if (item.radio == this.model.trueFalse[index]) {
          this.total_points += Number(item.score);
        }
      })
      let data = {};
      data.sId = student.data.sId;
      data.name = student.data.name;
      data.score = this.total_points;
      data.college = student.data.college;
      data.profession = student.data.profession;
      data.class = student.data.class;
      data.singleTopicSelection = this.model.singleTopicSelection;//单选题
      data.multipleChoice = this.model.multipleChoice;//多选题
      data.trueFalse = this.model.trueFalse;//判断题
      data.test_paper = this.id;//当前的试卷
      data.course = this.test_parper.course;
      let list = await this.$http.post('rest/test_paper_score', data);
      // console.log(list);
      if (list.status >= 200 && list.status < 300) {
        Notify({
          message: '提交成功',
          color: '#FFF',
          background: '#9373ff',
        });
        this.$router.replace('/');
      }
      clearInterval(this.dsq);//关闭定时器
      sessionStorage.removeItem('duration');//提交后清除倒计时
      sessionStorage.removeItem('model');//清除保存的答案
    },
    //提交试卷的函数
    onSubmit() {
      //提交时问一下是否确定提交
      Dialog.confirm({
        title: '提交',
        message: '是否确定提交',
      })
        .then(async () => {
          //每次提交钱都把，分数清一下
          this.total_points = 0;
          //在这里校验答案，后面在写，服务器没有发送过来答案，老师批改，现在暂时不写
          let student = await this.$http.get('/rest/student_user/' + JSON.parse(localStorage.s_user).id);
          // console.log(student.data);//获取学生个人信息
          //遍历单选题,没有打乱的前提
          this.test_parper.singleTopicSelection.forEach((item, index) => {
            //回答正确，成绩追加
            if (item.radio == this.model.singleTopicSelection[index]) {
              this.total_points += Number(item.score);
              // console.log(true);
            }
          })
          //遍历多选题,没有打乱的前提
          this.test_parper.multipleChoice.forEach((item, index) => {
            //回答正确，成绩追加
            //先判断选中的答案是否和正确的答案长度相同
            // console.log(item.checked);//正确答案
            // console.log(this.model.multipleChoice[index]);
            // if (this.model.multipleChoice[index] == undefined || this.model.multipleChoice[index].length == 0) {
            //   console.log('unde');
            //   Notify({ type: 'warning', message: `当前多选题第${index + 1}题未作答的题` });
            // }
            if (this.model.multipleChoice[index] && this.model.multipleChoice[index].length == item.checked.length) {
              //然后在进行数组的排序，后在转为字符串在比较
              this.model.multipleChoice[index].sort();
              item.checked.sort();
              if (this.model.multipleChoice[index].toString() == item.checked.toString()) {
                this.total_points += Number(item.score);
              }
            }
          })
          //遍历判断题,没有打乱的前提
          this.test_parper.trueFalse.forEach((item, index) => {
            if (item.radio == this.model.trueFalse[index]) {
              this.total_points += Number(item.score);
            }
          })
          let data = {};
          data.sId = student.data.sId;
          data.name = student.data.name;
          data.score = this.total_points;
          data.college = student.data.college;
          data.profession = student.data.profession;
          data.class = student.data.class;
          data.singleTopicSelection = this.model.singleTopicSelection;//单选题
          data.multipleChoice = this.model.multipleChoice;//多选题
          data.trueFalse = this.model.trueFalse;//判断题
          data.test_paper = this.id;//当前的试卷
          data.course = this.test_parper.course;
          //考试成绩表，携带过去的数据应该有学生的姓名，id，成绩，学院，专业，班级，如果是需要老师修改的，那还有携带答案过去
          if (data.singleTopicSelection.length > 0 && data.multipleChoice.length > 0 && data.trueFalse.length > 0) {
            let list = await this.$http.post('rest/test_paper_score', data);
            // console.log(list);
            if (list.status >= 200 && list.status < 300) {
              Notify({
                message: '提交成功',
                color: '#FFF',
                background: '#9373ff',
              });
              this.$router.replace('/');
            }
          } else {
            for (let index = 0; index < this.test_parper.singleTopicSelection.length; index++) {
              if (!data.singleTopicSelection[index]) {
                Notify({ type: 'warning', message: `当前单选题第${index + 1}题未作答` });
                return;
              }
            }
            for (let index = 0; index < this.test_parper.multipleChoice.length; index++) {
              if (!data.multipleChoice[index] || data.multipleChoice[index] == 0) {
                Notify({ type: 'warning', message: `当前多选题第${index + 1}题未作答` });
                return;
              }
            }
            for (let index = 0; index < this.test_parper.trueFalse.length; index++) {
              if (!data.trueFalse[index]) {
                Notify({ type: 'warning', message: `当前判断题第${index + 1}题未作答` });
                return;
              }
            }
          }
          clearInterval(this.dsq);//关闭定时器
          sessionStorage.removeItem('duration');//提交后清除倒计时
          sessionStorage.removeItem('model');//清除保存的答案
        })
        .catch(() => {
          console.log('取消了');
        });


    },
    //把答案暂时保存到浏览器的session中，保存按钮
    save() {
      sessionStorage.setItem('model', JSON.stringify(this.model));
      Notify({
        message: '保存成功',
        color: '#FFF',
        background: '#9373ff',
      });
    },
    async fetch() {
      const res = await this.$http.get('rest/test_paper/' + this.id);
      // console.log(res);
      this.test_parper = res.data;
      if (res.status >= 200 && res.status < 300) {
        this.durationStr();
      }
    },

  },

  created() {
    // this.test_parper = this.$route.query.id
    // console.log(this.test_parper);
    this.fetch();
    //拿到暂时保存在session中的东西
    if (sessionStorage.getItem('model')) {
      this.model = JSON.parse(sessionStorage.getItem('model'));
    }
  },
  //当执行到destroyed函数的时候，组件已近被完全销毁了，此时组件中
  destroyed() {
    //清楚session
    sessionStorage.removeItem('duration');
    sessionStorage.removeItem('model');
  },
}
</script>
<style scoped>
#dati {
  width: 100%;
  background-color: #f0f0f0;
  height: calc(100vh - 57px);
  position: relative;
  z-index: 999;
}
.save {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  right: 10px;
  top: 50%;
  z-index: 999;
  color: #ffffff;
  box-shadow: 0px 0px 6px 1px #755ef5;
}
.top {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 10px 0px;
}
.top div {
  width: 100px;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top div:nth-of-type(1) {
  color: #755ef5;
}
.bottom {
  background-color: #ffffff;
  margin: 10px 0px;
  margin-bottom: 53px;
  min-width: 375px;
}

.bottom .tixing {
  border-bottom: 2px solid #e3e3e3;
  padding: 10px 0;
  color: #00aaff;
  font-weight: bold;
}

.bottom .title {
  font-weight: bold;
  font-size: 17px;
  color: #eec429;
  padding: 10px 0;
}

.bottom > div {
  margin: 0px 20px;
}
</style>