<template>
  <div class="my_message">
    <h2 style="color: #67c23a">个人信息：</h2>
    <div style="margin: 20px"></div>
    <el-form
      label-width="120px"
      ref="form"
      @submit.native.prevent="save('form')"
      :model="model"
      :rules="rules"
      class="box_red"
    >
      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="教师号：" prop="tId">
            <el-input
              v-model="model.tId"
              placeholder="只能为数字，登录时根据这个登录"
              type="number"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input
              v-model="model.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-radio v-model="model.gender" label="1">男</el-radio>
            <el-radio v-model="model.gender" label="0">女</el-radio>
          </el-form-item>
          <el-form-item
            label="出生日期："
            prop="introductionToThe[dateOfBirth]"
          >
            <el-date-picker
              v-model="model.introductionToThe.dateOfBirth"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="age" label="年龄：">
            <el-input v-model="model.age"></el-input>
          </el-form-item>
          <el-form-item prop="introductionToThe[eMain]" label="邮箱：">
            <el-input v-model="model.introductionToThe.eMain"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学院：" prop="college">
            <el-select v-model="model.college" placeholder="请选择">
              <el-option
                v-for="item in colleges"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业：" prop='profession'>
            <el-select v-model="model.profession" placeholder="请选择">
              <el-option
                v-for="item in professions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级：" prop='class'>
            <el-select v-model="model.class" placeholder="请选择">
              <el-option
                v-for="item in classes"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称：">
            <el-input
              v-model="model.introductionToThe.teachersTitle"
              placeholder="请输入职称"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="phone">
            <el-input
              v-model="model.introductionToThe.phone"
              placeholder="只能为数字"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "AdminEdit",
  data() {
    //自定义校验函数，自定义校验 callback 必须被调用
    var validateDateOfBirth = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入出生日期'));
      } else if (value > new Date().getTime()) {
        callback(new Error('出生日期不得大于当前时间'));
      } else {
        callback()
      }
    }
    return {
      isSuccessfully: true,
      model: {
        name: "",
        icon: "",
        gender: "1",
        college: '',
        profession: '',
        class: '',
        age: 0,
        introductionToThe: {
          dateOfBirth: 0,//出生日期
          dateOfBirthStr: "0",//计算年龄
        },
      },
      colleges: [],
      professions: [],
      classes: [],
      //当前要修改的教师的id
      id: '',
      flagCollege: false,//在下面监听数据的时候第一次不执行
      flagProfession: false,//在下面监听数据的时候第一次不执行
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选中性别', trigger: 'blur' }],
        "introductionToThe[eMain]": [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        "introductionToThe[dateOfBirth]": [{ validator: validateDateOfBirth, trigger: 'blur' }],
        college:[{ required: true, message: '请选择学院', trigger: 'blur' }],
        profession:[{ required: true, message: '请选择专业', trigger: 'blur' }],
        class:[{ required: true, message: '请选择班级', trigger: 'blur' }],
      }
    };
  },
  methods: {
    async getMy() {
      this.openFullScreen2();
      const res = await this.$http.get(`rest/teacher_users/teacher`);//自定义携带的参数
      this.id = res.data._id;
      if (res.status == 200) {
        this.loading.close()
      }
      this.model = res.data;
    },
    //获取学院
    async getCollege() {
      // this.openFullScreen2();
      const res = await this.$http.get('rest/colleges');
      // if (res.status == 200) {
      //   this.loading.close()
      // }
      this.colleges = res.data;
      // if (this.model.college) {
      //   this.getProfession();
      // }
    },
    //获取专业
    async getProfession() {
      const res = await this.$http.get('rest/professions');
      let college = await this.$http.get(`rest/colleges/${this.model.college}`);
      this.professions = [];
      res.data.forEach((item, index) => {
        if (item.college.name == college.data.name) {
          this.professions.push(item)
        }
      })
      // if (this.model.profession) {
      //   this.getClass();
      // }
    },
    async getClass() {
      const res = await this.$http.get('rest/class');
      let profession = await this.$http.get(`rest/professions/${this.model.profession}`);
      this.classes = [];
      res.data.forEach((item, index) => {
        if (item.profession.name == profession.data.name) {
          this.classes.push(item)
        }
      })
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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // this.openFullScreen2();//显示加载
          let list = await this.$http.put(`rest/teacher_users/${this.id}`, this.model);//发请求
          // if (list.status == 200) {
          //   this.loading.close()
          // }
          localStorage.personalDetails = JSON.stringify(list.data);
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
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
  watch: {
    'model.introductionToThe.dateOfBirth': {
      handler(value) {
        if (value == null) {
          this.model.age = 0
        }
        let currenTime = new Date();//当前时间
        let currenYear = currenTime.getFullYear()//当前年
        let currenMonth = currenTime.getMonth() + 1;//当前月
        let currenDate = currenTime.getDate();//当前日

        let selectTime = new Date(value);//选中时间
        let selectYear = selectTime.getFullYear();//选中年
        let selectMonth = selectTime.getMonth() + 1//选中月
        let selectDate = selectTime.getDate()//选中日
        
        let year = currenYear - selectYear;
        let month = currenMonth - selectMonth;
        let date = currenDate - selectDate;
        if (year > 0 && (month >= 0 && date >= 0)) {
          this.model.age = year
        } else if (year > 0 && (month <= 0 && date < 0)) {
          this.model.age = year + 1
        }  else if (year < 0) {
          this.model.age = 0
        }else{
          this.model.age = year
        }
        this.model.introductionToThe.dateOfBirthStr = `${selectYear}-${selectMonth}-${selectDate}`;
      },
      // immediate: true//初始化时，让handler调用一下
    },
    'model.college'(value) {
      if (this.model.college) {
        if (this.flagCollege) {
          this.model.profession = '';
          this.model.class = '';
        } else {
          this.flagCollege = true
        }
        this.getProfession();
      }
    },
    'model.profession'(value) {
      if (this.model.profession) {
        if (this.flagProfession) {
          this.model.class = '';
        } else {
          this.flagProfession = true
        }
        this.getClass();
      }
    }

  },
  created() {
    this.getMy()
    this.getCollege();
  },
}
</script>
<style>
.my_message {
  background-color: #ebeef5;
  padding: 20px;
  min-width: 680px;
}
.el-form-item__label {
  color: #409eff;
}
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