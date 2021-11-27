<template>
  <div>
    <h2>{{ id ? "修改" : "添加" }}班级</h2>
    <div style="margin: 20px"></div>
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="选择专业：" prop="profession" >
        <el-select v-model="model.profession" clearable placeholder="请选择专业" @visible-change="visibleChange">
          <el-option
            v-for="item in professions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称：" prop="name">
        <el-input
          v-model="model.name"
          placeholder="请输入班级名称："
          autofocus
        ></el-input>
      </el-form-item>
      <el-form-item label="班级logo：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
           :headers="getAuthHeaders()"
           :before-upload="beforeAvatarUpload"
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
  name: "ClassEdit",
  props: ['id'],//路由中需要配置props
  data() {
    return {
      isSuccessfully: true,
      model: {
        name: "",//班级
        logoImg: "",
        college:{},
        date: new Date().toLocaleDateString()
      },
      professions:[],
      rules: {
        name: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        profession:[{ required: true, message: '请选择专业', trigger: 'blur' }]
      },
    };
  },
  methods: {
    //下拉框隐藏时触发
    visibleChange(flag){
      if(!flag){
        this.chooseProfession();
      }
    },
    //选择z专业
    chooseProfession(){
      if(this.model.profession){
        this.professions.forEach(item => {
          if(this.model.profession == item._id){
            this.model.college = item.college;
          }
        })
      }
    },
    async fetch() {
      const list = await this.$http.get(`rest/class/${this.id}`);
      //方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      this.model = Object.assign({}, this.model, list.data);//目标对象没有的会添加进去，有的会覆盖掉
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();//重置
      // this.$refs.img.src = "";
      this.model.logoImg = "";
      // console.log(this.$refs.img);
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
      const res = await this.$http.get('rest/class');
      res.data.forEach((item) => {
        if (this.model.name == item.name  && !this.id) {
          this.isSuccessfully = false;
          this.$message({
            type: 'warning',
            message: '已有相同的班级存在!'
          });
          throw new Error("已有相同的班级存在!");
        } else {
          this.isSuccessfully = true;
        }
      })
      if (!this.isSuccessfully) {
        return false;
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let list;
          this. openFullScreen2();
          if (this.id) {
            list = await this.$http.put(`rest/class/${this.id}`, this.model);//发请求
          } else {
            list = await this.$http.post('rest/class', this.model);//发请求
          }
          if (list.status == 200) {
            this.loading.close()
          }
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/admin_main/class/list')
        } else {
          this.$message({
            type: 'error',
            message: '保存失败!'
          });
          return false;
        }
      });
    },
    async getProfessionList() {
      const res = await this.$http.get('rest/professions');
      this.professions = res.data;
    }
  },
  created() {
    this.getProfessionList();
    this.id && this.fetch();
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