<template>
  <div>
    <h2>{{ id ? "修改" : "添加" }}试卷</h2>
    <div style="margin: 20px"></div>
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="选择课程：" prop="profession_course">
        <el-select
          v-model="model.profession_course"
          clearable
          placeholder="请选择课程"
        >
          <el-option
            v-for="item in profession_courses"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷标题：" prop="title">
        <el-input
          placeholder="请输入试卷标题"
          v-model="model.title"
          @input="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="考试时间：" prop="time">
        <div class="block">
          <el-date-picker
            v-model="model.time"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="考试时长：" prop="duration">
        <el-time-picker
          v-model="model.duration"
          placeholder="考试时长"
          value-format="timestamp"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item>
        <template>
          <el-checkbox v-model="model.isTitleRandon">题目随机排序</el-checkbox>
        </template>
        <template>
          <el-checkbox v-model="model.isOptionsRandon"
            >选项随机排序</el-checkbox
          >
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-checkbox v-model="model.isInspect">提交后预览试卷</el-checkbox>
        </template>
        <template>
          <el-checkbox v-model="model.isTotal">提交后展示分数</el-checkbox>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-checkbox v-model="model.isRepetition">重复考试</el-checkbox>
        </template>
      </el-form-item>
      <el-form-item label="重复次数：" v-if="model.isRepetition">
        <el-input
          placeholder="重复次数："
          v-model.number="model.repetition"
          type="number"
          min="0"
          style="width: 100px"
        ></el-input>
      </el-form-item>
      <el-tabs type="border-card" v-if="isShow">
        <el-tab-pane label="单选题">
          <single-topic-selection
            :singleTopicSelection="model.singleTopicSelection"
          />
        </el-tab-pane>
        <el-tab-pane label="多选题">
          <multiple-choice :multipleChoice="model.multipleChoice" />
        </el-tab-pane>
        <el-tab-pane label="判断题">
          <true-false :trueFalse="model.trueFalse" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem" v-else>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form-item>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleTopicSelection from './Childre/SingleTopicSelection.vue';//单选题
import MultipleChoice from './Childre/MultipleChoice.vue';//多选题
import TrueFalse from './Childre/TrueFalse.vue';//判断题
export default {
  props: ['id'],//路由中需要配置props
  name: 'TestPaperEdit',
  components: { SingleTopicSelection, MultipleChoice, TrueFalse },
  data() {
    return {
      model: {
        //课程名字
        profession_course: '',
        //单选题
        singleTopicSelection: [],
        // 多选题
        multipleChoice: [],
        // 判断题
        trueFalse: [],
        // 题数
        number: 0,
        // 总分
        total: 0,
        time: [],//考试时间，时间戳
        duration: 0,//考试时长，时间戳
        timeStr: [],//考试时间，字符串格式
        durationStr: "",//考试时长
        isTitleRandon: false,//题目是否随机排序
        isOptionsRandon: false,//选项是否随机排序
        isInspect: true,//作答后是否可以查看试卷
        isSave: false,//试卷是否已发布
        isTotal: true,//学生提交试卷后可以看到分数
        isRepetition: false,//是否可以重复考试
        repetition: 0,//重复次数
        //考试时间是否开始,true开始
        isStart: false,
        //考试时间是否过期,true为过期
        isEnd: false,
      },
      profession_courses: [],
      isShow: false,
      rules: {
        'profession_course': [{ required: true, message: '请选中课程', trigger: 'blur' }],
        //时间标题
        title: [{ required: true, message: '请输入试卷标题', trigger: 'blur' }],
        //考试时间
        time: [{ required: true, message: '请输入考试时间', trigger: 'blur' }],
        //考试时长
        duration: [{ required: true, message: '请输入考试时长', trigger: 'blur' }],
        //单选题
        // title: [{ required: true, message: '请输入题目标题', trigger: 'blur' }],
        // option: [{ required: true, message: '请输入答案内容', trigger: 'blur' }],
        // answer: [{ required: true, message: '请输入正确答案', trigger: 'blur' }],
        // score: [{ required: true, message: '请输入该题分值', trigger: 'blur' }],
      }
    };
  },
  methods: {
    nextStep() {
      if (!this.model.title || !this.model.profession_course) {
        this.$message({
          type: 'warning',
          message: '必须选择课程和填写试卷标题!'
        })
        return;
      }
      // if(this.model.time.length == 0){
      //   return;
      // }
      // if(!this.model.duration){
      //   return;
      // }
      this.isShow = true
    },
    input() {
      if (!this.model.name) {
        this.isShow = false
      }
    },
    //加载的显示
    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.model.total = 0;
          this.model.number = 0;
          //单选题，多选题，判断题必须最少有一道
          if (this.model.singleTopicSelection && this.model.singleTopicSelection.length == 0) {
            this.$message({
              type: 'warning',
              message: '单选题最少要有一道!'
            })
            return false;
          }
          if (this.model.multipleChoice && this.model.multipleChoice.length == 0) {
            this.$message({
              type: 'warning',
              message: '多选题最少要有一道!'
            })
            return false;
          }
          if (this.model.trueFalse && this.model.trueFalse.length == 0) {
            this.$message({
              type: 'warning',
              message: '判断题最少要有一道!'
            })
            return false;
          }
          if (this.model.singleTopicSelection) {
            this.model.number += this.model.singleTopicSelection.length
            this.model.singleTopicSelection.forEach(item => {
              this.model.total += item.score * 1
            })
          }
          if (this.model.multipleChoice) {
            this.model.number += this.model.multipleChoice.length
            this.model.multipleChoice.forEach(item => {
              this.model.total += item.score * 1
            })
          }
          if (this.model.trueFalse) {
            this.model.number += this.model.trueFalse.length
            this.model.trueFalse.forEach(item => {
              this.model.total += item.score * 1
            })
          }
          let list;
          this.openFullScreen2();//显示加载
          if (this.id) {
            list = await this.$http.put(`rest/course_test_paper/${this.id}`, this.model);//发请求
          } else {
            list = await this.$http.post('rest/course_test_paper', this.model);//发请求
          }
          if (list.status == 200) {
            this.loading.close()
          }
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/teacher_main/course_test_paper/list')
        } else {
          this.$message({
            type: 'error',
            message: '保存失败!'
          });
          return false;
        }
      });
    },
    async fetch() {
      const list = await this.$http.get(`rest/course_test_paper/${this.id}`);
      //方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      this.model = Object.assign({}, this.model, list.data);//目标对象没有的会添加进去，有的会覆盖掉
    },
    async getProfessionCourse() {
      let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
      if (tId) {
        // this.openFullScreen2();
        const res = await this.$http.get('rest/profession_course/teacher/' + tId);
        if (res.status == 200) {
          // this.loading.close()
        } else {
          return false;
        }
        this.profession_courses = res.data

      }
    },
    async getMy() {
      let id = localStorage.t_user ? JSON.parse(localStorage.t_user).id : '';
      const res = await this.$http.get(`rest/teacher_users/${id}`);
      // this.model.college = res.data.college
      // this.model.profession = res.data.profession
      this.model.tId = res.data.tId;
    },
  },
  watch: {
    'model.time'(value) {
      this.model.timeStr[0] = new Date(value[0]).toLocaleString();
      this.model.timeStr[1] = new Date(value[1]).toLocaleString();
    },
    "model.duration"(value) {
      let time = new Date(value);
      let hours = time.getHours();//获取小时
      let minutes = time.getMinutes();//获取分钟
      let seconds = time.getSeconds();//获取秒
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.model.durationStr = hours + ":" + minutes + ":" + seconds;
    },
    'model.isRepetition'(value) {
      if (!value) {
        this.model.repetition = 0;
      }
    }
  },
  created() {
    this.id && this.fetch();
    this.getProfessionCourse();
    this.getMy();
    this.model.total = 0;
  },
}
</script>
<style scoped>
</style>