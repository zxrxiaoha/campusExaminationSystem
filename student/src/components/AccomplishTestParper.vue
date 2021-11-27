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
      <van-form>
        <div class="top">
          <div v-if="test_parper.isTotal">试卷得分：{{ model.score }}</div>
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
                  disabled
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
            <div class="mycorrect">
              我的答案：{{ model.singleTopicSelection[index] }}
            </div>
            <div class="correct">正确答案：{{ item.radio }}</div>
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
                  disabled
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
            <div class="mycorrect">
              我的答案：{{
                model.multipleChoice[index]
                  ? model.multipleChoice[index].toString()
                  : ""
              }}
            </div>
            <div class="correct">
              正确答案：<span>{{ item.checked.toString() }}</span>
            </div>
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
                <van-radio-group
                  v-model="model.trueFalse[item.index - 1]"
                  disabled
                >
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
            <div class="mycorrect" >
              我的答案：{{
                model.trueFalse[index]
                  ? model.trueFalse[index] == 1
                    ? "A"
                    : "B"
                  : ""
              }}
            </div>
            <div class="correct">
              正确答案：{{ item.radio == 1 ? "A" : "B" }}
            </div>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestParper',
  components: {},
  props: ['id'],
  data() {
    return {
      test_parper: {},
      model: {
        singleTopicSelection: [],
        multipleChoice: [],
        trueFalse: [],
        score: 0,
      },
      flag: true,//控制是否可提交，默认可以
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async fetch() {
      let res = '';
      try {
        res = await this.$http.get('rest/test_paper_score/' + this.id);
        this.test_parper = res.data.test_paper;
        this.model.singleTopicSelection = res.data.singleTopicSelection
      } catch (error) {
        res = await this.$http.get('rest/course_test_paper_score/' + this.id);
        this.test_parper = res.data.course_test_paper;
      }
      this.model.singleTopicSelection = res.data.singleTopicSelection
      this.model.multipleChoice = res.data.multipleChoice
      this.model.trueFalse = res.data.trueFalse
      this.model.score = res.data.score;
    },

  },

  created() {
    this.fetch();
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
.bottom .correct {
  color: #67c23a;
  padding-bottom: 10px;
  font-weight: bold;
}
.bottom .mycorrect {
  color:red;
  padding-bottom: 10px;
  font-weight: bold;
}
.top {
  background-color: #ffffff;
  margin: 10px 0px;
}
.top div {
  text-align: center;
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top div:nth-of-type(1) {
  color: #755ef5;
  font-weight: bold;
}
</style>