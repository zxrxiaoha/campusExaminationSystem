<template>
  <div>
    <h2>{{ id ? "修改" : "添加" }}课程</h2>
    <div style="margin: 20px"></div>
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="课程名称：" prop="name">
        <el-input
          v-model="model.name"
          placeholder="请输入课程名称："
          autofocus
        ></el-input>
      </el-form-item>
      <el-form-item label="课程图片：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="getAuthHeaders()"
        >
          <img v-if="model.logoImg" :src="model.logoImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CourseEdit",
  props: ['id'],//路由中需要配置props
  data() {
    return {
      isSuccessfully: true,
      model: {
        name: "",//课程
        logoImg: "",
        date: new Date().toLocaleDateString(),
        college: '',
        profession: '',
        writer:","
      },
      rules: {
        name: [{ required: true, message: '请输入课程', trigger: 'blur' }],
      },
    };
  },
  methods: {
    async getMy() {
      let id = localStorage.t_user ? JSON.parse(localStorage.t_user).id : '';
      const res = await this.$http.get(`rest/teacher_users/${id}`);
      // console.log(res);
      this.model.college = res.data.college
      this.model.profession = res.data.profession
      this.model.tId = res.data.tId;
      this.model.writer = res.data.name;
    },
    async fetch() {
      //编辑信息
      const list = await this.$http.get(`rest/profession_course/${this.id}`);
      //方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      this.model = Object.assign({}, this.model, list.data);//目标对象没有的会添加进去，有的会覆盖掉
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();//重置
      this.model.logoImg = "";
    },
    //图片上传成功后显示图片
    handleAvatarSuccess(file) {
      this.model.logoImg = file.url;
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
    async save(formName) {
      // this.model.writer = 
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let list;
          // this.openFullScreen2();//显示加载
          if (this.id) {
            list = await this.$http.put(`rest/profession_course/${this.id}`, this.model);//发请求
          } else {
            list = await this.$http.post('rest/profession_course', this.model);//发请求
          }
          //  if (list.status == 200) {
          //   this.loading.close()
          // }
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/teacher_main/course_card/list')
        } else {
          this.$message({
            type: 'error',
            message: '保存失败!'
          });
          return false;
        }
      });
    },
  },
  created() {
    this.id && this.fetch();
    this.getMy()
  },
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>