<template>
  <div>
    <h2>{{ id ? "修改" : "添加" }}教师</h2>
    <div style="margin: 20px"></div>
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="姓名：" prop="name">
        <el-input
          v-model="model.name"
          placeholder="请输入用户名"
          autofocus
        ></el-input>
      </el-form-item>
      <el-form-item label="编号：" prop="tId">
        <el-input
          v-model="model.tId"
          placeholder="只能为数字，登录时根据这个登录，必须为10个"
          maxlength="10"
          minlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password" v-if="!id">
        <el-input
          type="password"
          v-model="model.password"
          show-password
          placeholder="请输入密码"
        ></el-input>
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
  name: "TeacherEdit",
  props: ['id'],//路由中需要配置props
  data() {
    return {
      isSuccessfully: false,
      model: {
        name: "",
        password: "",
        tId: "",
        date: new Date().toLocaleDateString(),
        //简介
        introductionToThe: {
          teachersTitle: "",//教师职称
          phone: "",//电话号码
          address: "",//家庭住址
          eMain: "",//邮箱
          dateOfBirth: 0,//出生日期
          dateOfBirthStr: "0",//出生日期,年龄
        }
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        tId: [{ required: true, message: '请输入教师编号', trigger: 'blur' }]
      }
    };
  },
  methods: {
    async fetch() {
      const list = await this.$http.get(`rest/teacher_users/${this.id}`);
      //方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      this.model = Object.assign({}, this.model, list.data);//目标对象没有的会添加进去，有的会覆盖掉
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();//重置
      this.model.icon = "";
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
      const res = await this.$http.get('rest/teacher_users');
      res.data.forEach((item) => {
        this.isSuccessfully = false;
        if (this.model.tId == item.tId) {
          this.$message({
            type: 'warning',
            message: '已有相同的编号存在!'
          });
          throw new Error("已有相同的编号存在!");
        } else {
          this.isSuccessfully = true;
        }
      })
      if (res.data.length > 0 && !this.isSuccessfully) {
        return false;
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let list;
          this.openFullScreen2();//显示加载
          if (this.id) {
            list = await this.$http.put(`rest/teacher_users/${this.id}`, this.model);//发请求
          } else {
            list = await this.$http.post('rest/teacher_users', this.model);//发请求
          }
           if (list.status == 200) {
            this.loading.close()
          }
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/admin_main/teacher/list')
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