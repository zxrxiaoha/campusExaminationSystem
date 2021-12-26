<template>
  <div>
    <el-button size="small" @click="addTitle">
      <i class="el-icon-plus"></i>
      添加判断题
    </el-button>
    <el-row type="flex" style="flex-wrap: wrap">
      <el-col :md="12" v-for="(item, i) in trueFalse" :key="i">
        <el-form-item :label="topicNum(i)" prop="title">
          <el-input type="textarea" v-model="item.title"></el-input>
        </el-form-item>
        <el-form-item label="可获得分数：" prop="score">
          <el-input v-model="item.score"></el-input>
        </el-form-item>
        <el-form-item label="正确答案：" prop="answer">
          <el-radio v-model="item.radio" label="1">对</el-radio>
          <el-radio v-model="item.radio" label="0">错</el-radio>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="danger" @click="deleteTitle(i)"
            >删除题目</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TrueFalse',
  props: {
    trueFalse: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {
      index: 0//单选题总共有多少个题目
    };
  },
  methods: {
    //添加题目
    addTitle() {
      this.index++;
      this.trueFalse.push({ index: this.index })//这里的index是题目序号
    },
    //删除题目，trueFalse[xxx].index，当前题目的题号
    deleteTitle(index) {
      this.index--;
      if (this.index <= 0) {
        this.index = 0;
      }
      this.trueFalse.splice(index, 1)
      for (let i = 0; i < this.index - index; i++) {
        this.trueFalse[index + i].index--;
      }
    },
    //题目的序号
    topicNum(index) {
      return `题目${index + 1}：`;
    },
  },
  created() {
    this.index = this.trueFalse.length;
  },
}
</script>