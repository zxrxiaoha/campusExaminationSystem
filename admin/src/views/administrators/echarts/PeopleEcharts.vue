<template>
  <div id="people"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'PeopleEcharts',
  components: {},
  props: ['people'],
  data() {
    return {
    //   people1: []
    };
  },
  methods: {
    load(people1) {
      var chartDom = document.getElementById('people');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {//标题
          text: '人员比例关系图',
          left: 'center',
          top: "4%"
        },
        tooltip: {//鼠标移上去提示一些信息
          trigger: 'item'
        },
        legend: {//上方的小方块是横排还是竖排
          orient: 'vertical',
          left: 'left'
        },//图例
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },//圆角样式
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {//图形文字的配置
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: people1.adminNum, name: '管理员' },
              { value: people1.teacherNum, name: '教师' },
              { value: people1.studentNum, name: '学生' }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
  },
  watch: {
    people: {
      handler(newVal) {
        // this.people1 = newVal;
       this.$nextTick(()=>{
          this.load(newVal);
        });
      },
      immediate:true,
      deep: true
    }
  }
}
</script>
<style scoped>
#people {
  width: 400px;
  height: 267px;
  margin: auto;
}
</style>