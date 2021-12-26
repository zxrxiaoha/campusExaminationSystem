<template>
  <div class="class">
    <el-button type="primary" icon="el-icon-back" round class="back" @click="$router.back()">返回</el-button>
    <ul class="classItem">
      <li
        v-for="item in classItemData"
        :key="item.name"
        @click="classItemClick(item)"
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
  props: ['profession','college'],
  name: 'ClassItemCardList',
  components: {},
  data() {
    return {
      classItemData: []
    };
  },
  methods: {
    async fetch() {
      const classItems = await this.$http.get('rest/class');
      if (!classItems.data) {
        return;
      }
      classItems.data.forEach((item,index) => {
        if (item.profession._id === this.profession) {
          this.classItemData.push(classItems.data[index]);
        }
      });
      // console.log(class1.data);
    },
    classItemClick(item) {
      // console.log(item.name,this.profession);
      this.$router.push({path:'/admin_main/course_card/list',query:{college:this.college,profession:this.profession,class:item._id}})
    }
  },
  computed: {},
  created() {
    this.fetch();
  },
}
</script>
<style scoped>
.classItem li {
  list-style: none;
}
.classItem {
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
.classItem > li {
  height: 300px;
  width: 300px;
  min-width: 300px;
  /* margin-bottom: 20px; */
  margin:10px;
  position: relative;
  border-radius: 20px;
  /* box-shadow: 0px 9px 17px 2px #a8a9a5;    */
}
.classItem > li > img {
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;
  top: 9%;
  left: 50%;
  transform: translate(-50%);
}
.classItem > li > p {
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
.classItem > li:nth-child(1) {
  background-color: #63b5ef;
}
.classItem > li:nth-child(2) {
  background-color: #92cb7b;
}
.classItem > li:nth-child(3) {
  background-color: #efd07c;
}
.classItem > li:nth-child(4) {
  background-color: #9872e0;
}
.classItem > li:nth-child(5) {
  background-color: #f89183;
}
.classItem > li:hover {
  /* border: 3px solid yellow; */
  box-shadow: 0px 9px 17px 2px #a8a9a5;
  cursor: pointer;
}
</style>