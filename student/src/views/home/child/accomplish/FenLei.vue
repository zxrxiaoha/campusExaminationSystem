<template>
  <div class="course">
    <div class="schoolCourse" @click="schoolCourse">校级课程</div>
    <div class="professionCourse" @click="professionCourse">专业课程</div>
  </div>
</template>

<script>
export default {
  name: 'FenLei',
  components: {},
  data() {
    return {

    };
  },
  methods: {
    schoolCourse() {
      this.$router.push({path:'accomplish_course',query:{name:'school'}})
    },
    professionCourse() {
       this.$router.push({path:'accomplish_course',query:{name:'profession'}})
    },
  },
}
</script>
<style scoped>
.course {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-evenly;
}
.course div {
  display: flex;
  width: 23.4375rem;
  min-width: 22.1875rem;
  height: 12.5rem;
  border-radius: 20px;
  margin: 0.625rem;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #2980b9, #38c8fb);
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  box-shadow: 0px 0px 6px 1px #6dd5fa;
}
</style>