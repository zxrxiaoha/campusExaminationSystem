<template>
  <div>
    <el-button size="small" @click="addTitle">
      <i class="el-icon-plus"></i>
      添加单选题
    </el-button>
    <el-row type="flex" style="flex-wrap: wrap">
      <el-col :md="12" v-for="(item, i) in singleTopicSelection" :key="i">
        <el-form-item :label="topicNum(i)" prop="title">
          <el-input type="textarea" v-model="item.title"></el-input>
        </el-form-item>
        <el-form-item
          :label="`答案${a}：`"
          v-for="a in singleTopicSelection[i].arr"
          prop="option"
        >
          <el-input type="textarea" v-model="item[a]"></el-input>
        </el-form-item>
        <el-form-item label="可获得分数：" prop="score">
          <el-input v-model.number="item.score"></el-input>
        </el-form-item>
        <el-form-item label="正确答案：" prop="answer">
          <el-radio
            v-model="item.radio"
            :label="a"
            v-for="a in singleTopicSelection[i].arr"
            :key="a"
            >{{ a }}</el-radio
          >
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="addOption(i)"
            >添加选项</el-button
          >
          <el-button size="small" type="danger" @click="deleteOption(i)"
            >删除选项</el-button
          >
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
  name: 'SingleTopicSelection',
  props: {
    singleTopicSelection: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {
      arrAZ: ['A', "B", "C", "D", "E", 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],//给传递进来的单选题中的arr添加一个
      index: 0//单选题总共有多少个题目
    };
  },
  methods: {
    //添加题目
    addTitle() {
      this.index++;
      this.singleTopicSelection.push({ arr: ['A', "B", "C", "D"], index: this.index })//这里的index是题目序号,这里的数组是，根据数组遍历出选项
    },
    //删除题目，singleTopicSelection[xxx].index，当前题目的题号
    deleteTitle(index) {
      this.index--;
      if (this.index <= 0) {
        this.index = 0;
      }
      this.singleTopicSelection.splice(index, 1)
      for (let i = 0; i < this.index - index; i++) {
        this.singleTopicSelection[index + i].index--;
      }
    },
    //添加选项
    addOption(index) {
      this.singleTopicSelection[index].arr.push(this.arrAZ[this.singleTopicSelection[index].arr.length]);
    },
    //删除选项
    deleteOption(index) {
      this.singleTopicSelection[index].arr.pop();
    },
    //题目的序号
    topicNum(index) {
      return `题目${index + 1}：`;
    },
  },
  created() {
    this.index = this.singleTopicSelection.length;
  },
}
</script>
<style scoped>
</style>