<template>
  <div>
    <h2>{{ id ? "修改" : "添加" }}管理员</h2>
    <div style="margin: 20px"></div>
    <!-- 
      rules:校验规则
      校验时需要在form-item中出入prop
      prop的值来自model
     -->
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="用户名：" prop="name">
        <el-input
          v-model="model.name"
          placeholder="请输入用户名"
          autofocus
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="编号：" prop="id">
        <el-input
          v-model="model.id"
          placeholder="只能为数字，登录时根据这个登录"
          type="number"
        ></el-input>
      </el-form-item> -->
      <!-- 点击编辑的时候不需要提交密码，和修改密码 -->
      <el-form-item label="密码：" prop="password" v-if="!id">
        <el-input
          type="password"
          v-model="model.password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
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
  name: "AdminEdit",
  props: ['id'],//路由中需要配置props
  data() {
    return {
      isSuccessfully: true,
      model: {
        name: "",
        password: "",
        icon: "",
        date: new Date().toLocaleDateString()
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  // computed: {
  //   url() {
  //     return this.$http.defaults.baseURL + '/upload';
  //   }
  // },
  methods: {
    async fetch() {
      const list = await this.$http.get(`rest/admin_users/${this.id}`);
      // this.model = list.data;
      //方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      this.model = Object.assign({}, this.model, list.data);//目标对象没有的会添加进去，有的会覆盖掉
      // console.log(list);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();//重置
      // this.$refs.img.src = "";
      this.model.icon = "";
      // console.log(this.$refs.img);
    },
    //图片上传成功后显示图片
    handleAvatarSuccess(file) {
      this.model.icon = file.url;
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
      const res = await this.$http.get('rest/admin_users');
      if (typeof res.data == "string") {
        this.$message({
          type: 'warning',
          message: '你没有权限添加!'
        });
        return false;
      }
      res.data.forEach((item) => {
        if (this.model.name == item.name && !this.id) {
          this.isSuccessfully = false;
          this.$message({
            type: 'warning',
            message: '已有相同的用户名存在!'
          });
          throw new Error("已有相同的用户名存在!");
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
          this.openFullScreen2();//显示加载
          if (this.id) {
            list = await this.$http.put(`rest/admin_users/${this.id}`, this.model);//发请求
          } else {
            list = await this.$http.post('rest/admin_users', this.model);//发请求
          }
          if (list.status == 200) {
            this.loading.close()
          }
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/admin_main/admin/list')
        } else {
          this.$message({
            type: 'error',
            message: '保存失败!'
          });
          return false;
        }
      });
    }
  },
  created() {
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