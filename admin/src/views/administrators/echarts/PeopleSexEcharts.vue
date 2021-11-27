<template>
  <div id="sex"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'PeopleSexEcharts',
  components: {},
  props:['sex'],
  data() {
    return {

    };
  },
  methods: {
    load(sex) {
      let teacherSex = sex.teacherSex
      let studentSex = sex.studentSex
      var chartDom = document.getElementById('sex');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: '男女比例',
          left: 'center',
          bottom: "4%"
        },
        legend: {
          top: "4%"
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '男', '女', '未知'],
            ['教师', teacherSex.man, teacherSex.girl, teacherSex.unknown],
            ['学生', studentSex.man, studentSex.girl, studentSex.unknown],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      };

      option && myChart.setOption(option);
    },
  },
  watch: {
    sex: {
      handler(newVal) {
        this.$nextTick(()=>{
          this.load(newVal);
        });
      },
      immediate:true,//初始化时，让handler调用一下
      deep: true
    }
  },
  created() {
  },
}
</script>
<style scoped>
#sex {
  width: 400px;
  height: 267px;
  margin: auto;
}
</style>