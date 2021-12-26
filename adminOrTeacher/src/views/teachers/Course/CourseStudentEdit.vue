<template>
  <div>
    <!-- <h2>{{ id ? "修改" : "添加" }}学生</h2> -->
    <h2>为课程添加学生</h2>
    <div style="margin: 20px"></div>
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="选择课程：" prop="profession_course">
        <el-select
          v-model="model.profession_course"
          clearable
          placeholder="请选择课程"
        >
          <el-option
            v-for="item in profession_courses"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号：" prop="sId">
        <el-input
          v-model.number="model.sId"
          placeholder="输入学生学号，进行添加"
          minlength="10"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "StudentEdit",
  data() {
    return {
      isSuccessfully: false,
      model: {
        sId: "",
        date: new Date().toLocaleDateString(),
        profession_course: '',
        tId: '',
      },
      profession_courses: []
      ,
      rules: {
        sId: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        'profession_course': [{ required: true, message: '请选中课程', trigger: 'blur' }],
      }
    };
  },
  methods: {
    async getMy() {
      let id = localStorage.t_user ? JSON.parse(localStorage.t_user).id : '';
      const res = await this.$http.get(`rest/teacher_users/${id}`);
      this.model.tId = res.data.tId;
    },
    async fetch() {
      let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
      if (tId) {
        this.openFullScreen2();
        const res = await this.$http.get('rest/profession_course/teacher/' + tId);
        if (res.status == 200) {
          this.loading.close()
        } else {
          return false;
        }
        this.profession_courses = res.data

      }

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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //获取所有的学生
          let student = await this.$http.get('rest/student_users');
          let sIds = [];
          if (student.data.length) {
            student.data.forEach(item => {
              sIds.push(item.sId);
            })
          } else {
            this.$message({
              type: 'warning',
              message: '学号不存在!'
            });
            return false;
          }
          //因为是字符串，所有必须转位数字
          if (sIds.indexOf(this.model.sId) == -1) {
            this.$message({
              type: 'warning',
              message: '学号不存在!'
            });
            return false;
          }
          let tId = localStorage.t_user ? JSON.parse(localStorage.t_user).tId : '';
          if (tId) {
            const res = await this.$http.get('rest/course_student/' + tId);
            res.data.forEach((item) => {
              if (this.model.sId == item.sId && item.profession_course._id == this.model.profession_course) {
                this.isSuccessfully = false;
                this.$message({
                  type: 'warning',
                  message: '课程已有该学生!'
                });
                throw new Error("课程已有该学生!");
              } else {
                this.isSuccessfully = true;
              }
            })
          }
          let list;
          this.openFullScreen2();//显示加载
          if (this.id) {
            list = await this.$http.put(`rest/course_student/${this.id}`, this.model);//发请求
          } else {
            list = await this.$http.post('rest/course_student', this.model);//发请求
          }
          if (list.status == 200) {
            this.loading.close()
          }
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.profession_courses.forEach(item => {
            if (item._id == this.model.profession_course) {
              this.$router.push('/teacher_main/course_student/list?name=' + item.name)
            }
          })
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
    this.fetch();
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