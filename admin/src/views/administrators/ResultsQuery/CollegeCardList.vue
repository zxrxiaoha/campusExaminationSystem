<template>
  <div class="college">
    <ul class="collegeItem">
      <li
        v-for="item in collegeData"
        :key="item.name"
        @click="collegeClick(item)"
      >
        <img :src="item.logoImg" alt="" v-if="item.logoImg" />
        <img src="~assets/img/zipper.png" alt="" v-else />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CollegeCardList',
  components: {},
  data() {
    return {
      collegeData: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/colleges');
      //   console.log(res);
      this.collegeData = res.data;
      //可以在这里获取所有学院的所有成绩
    },
    async collegeClick(item) {
      this.$router.push({ path: '/admin_main/profession_card/list', query: { college: item._id } })
    }
  },
  computed: {},
  created() {
    this.fetch();
  },
}
</script>
<style scoped>
.college .collegeItem li {
  list-style: none;
}
.collegeItem {
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.collegeItem > li {
  height: 300px;
  width: 300px;
  min-width: 300px;
  margin-bottom: 20px;
  position: relative;
  /* box-shadow: 0px 9px 17px 2px #a8a9a5;    */
  border-radius: 20px;
  margin-left: 20px;
}
.collegeItem > li > img {
  position: absolute;
  width: 200px;
  top: 9%;
  left: 50%;
  transform: translate(-50%);
}
.collegeItem > li > p {
  margin: 0;
  width: 100%;
  position: absolute;
  bottom: 9%;
  left: 50%;
  transform: translate(-50%);
  font-weight: bold;
  font-size: 2rem;
  color: white;
  text-align: center;
}
.collegeItem > li:nth-child(1) {
  background-color: #63b5ef;
}
.collegeItem > li:nth-child(2) {
  background-color: #92cb7b;
}
.collegeItem > li:nth-child(3) {
  background-color: #efd07c;
}
.collegeItem > li:nth-child(4) {
  background-color: #9872e0;
}
.collegeItem > li:nth-child(5) {
  background-color: #f89183;
}
.collegeItem > li:hover {
  /* border: 3px solid yellow; */
  box-shadow: 0px 9px 17px 2px #a8a9a5;
  cursor: pointer;
}
</style>