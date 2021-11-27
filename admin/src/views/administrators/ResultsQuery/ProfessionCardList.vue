<template>
  <div class="profession">
    <el-button
      type="primary"
      icon="el-icon-back"
      class="back"
      round
      @click="$router.back()"
      >返回</el-button
    >
    <ul class="professionItem">
      <li
        v-for="item in professionData"
        :key="item.name"
        @click="professionClick(item)"
      >
        <!-- <img :src="item.logoImg == '' ? '../../../assets/img/dxyy.jpg':item.logoImg" alt="" /> -->
        <img :src="item.logoImg" alt="" v-if="item.logoImg" />
        <img src="~assets/img/zipper.png" alt="" v-else />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['college'],//结束学院
  name: 'ProfessionCardList',
  components: {},
  data() {
    return {
      professionData: []
    };
  },
  methods: {
    async fetch() {
      const professions = await this.$http.get('rest/professions');//获取所有专业
      // const class1 = await this.$http.get('rest/class');
      if (!professions.data) {
        return;
      }
      professions.data.forEach((item, index) => {
        //比较学院名子
        if (item.college._id === this.college) {
          this.professionData.push(professions.data[index]);
        }
      });
      // console.log(class1.data);
    },
    professionClick(item) {
      this.$router.push({ path: '/admin_main/class_card/list', query: { college: this.college, profession: item._id } })
    }
  },
  computed: {},
  created() {
    this.fetch();
    // console.log(this.college);
  },
}
</script>
<style scoped>
.profession .professionItem li {
  list-style: none;
}
.professionItem {
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.back {
  margin-left: 20px;
  margin-bottom: 20px;
  box-shadow: 3px 4px 9px 0px #969b9f;
}
.professionItem > li {
  height: 300px;
  width: 300px;
  min-width: 300px;
  margin-bottom: 20px;
  position: relative;
  border-radius: 10px;
  /* box-shadow: 0px 9px 17px 2px #a8a9a5;    */
  background-color: #63b5ef;
  border-radius: 20px;
  margin-left: 20px;
}
.professionItem > li > img {
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;
  top: 9%;
  left: 50%;
  transform: translate(-50%);
}
.professionItem > li > p {
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
.professionItem > li:nth-child(1) {
  background-color: #63b5ef;
}
.professionItem > li:nth-child(2) {
  background-color: #92cb7b;
}
.professionItem > li:nth-child(3) {
  background-color: #efd07c;
}
.professionItem > li:nth-child(4) {
  background-color: #9872e0;
}
.professionItem > li:nth-child(5) {
  background-color: #f89183;
}
.professionItem > li:nth-child(6) {
  background-color: #92cb7b;
}
.professionItem > li:nth-child(7) {
  background-color: #efd07c;
}
.professionItem > li:nth-child(8) {
  background-color: #9872e0;
}
.professionItem > li:nth-child(9) {
  background-color: #92cb7b;
}
.professionItem > li:hover {
  /* border: 3px solid yellow; */
  box-shadow: 0px 9px 17px 2px #a8a9a5;
  cursor: pointer;
}
</style>