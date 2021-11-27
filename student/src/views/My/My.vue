<template>
  <div>
    <div class="border"><van-nav-bar title="个人中心" right-text="修改密码" @click-right="editPassword"> </van-nav-bar></div>
    <van-form @submit="onSubmit" class="form" scroll-to-error colon>
      <!-- 头像 -->
      <div class="borderItem">
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader
              v-model="fileList"
              :max-count="1"
              :after-read="afterRead"
              result-type="file"
            />
          </template>
        </van-field>
      </div>
      <!-- 学号 -->
      <div class="borderItem">
        <van-cell-group>
          <van-field
            v-model="model.sId"
            label="学号"
            placeholder="学号"
            readonly
          />
        </van-cell-group>
      </div>
      <!-- 姓名 -->
      <div class="borderItem">
        <van-cell-group>
          <van-field
            v-model="model.name"
            label="姓名"
            placeholder="输入姓名(必填)"
            :rules="[{ required: true, message: '请填写姓名' }]"
          />
        </van-cell-group>
      </div>
      <!-- 性别 -->
      <div class="borderItem">
        <van-field
          name="uploader"
          label="性别"
          placeholder="输入性别(必填)"
          :rules="[{ required: true, message: '请选择性别' }]"
        >
          <template #input>
            <van-radio-group v-model="model.gender" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <!-- 学院 -->
      <div class="borderItem">
        <van-field
          readonly
          clickable
          name="picker"
          :value="collegeName"
          label="学院"
          placeholder="点击选择学院(必填)"
          :rules="[{ required: true, message: '请选择学院' }]"
          @click="showPickerCollege = true"
        />
        <van-popup v-model="showPickerCollege" position="bottom">
          <van-picker
            title="学院"
            show-toolbar
            :columns="colleges"
            value-key="name"
            @confirm="onConfirmCollege"
            @cancel="showPickerCollege = false"
          />
        </van-popup>
      </div>
      <!-- 专业 -->
      <div class="borderItem">
        <van-field
          readonly
          clickable
          name="picker"
          :value="professionName"
          label="专业"
          placeholder="点击选择专业(必填)"
          :rules="[{ required: true, message: '请选择专业' }]"
          @click="showPickerProfession = true"
        />
        <van-popup v-model="showPickerProfession" position="bottom">
          <van-picker
            title="专业"
            show-toolbar
            :columns="professions"
            value-key="name"
            @confirm="onConfirmProfession"
            @cancel="showPickerProfession = false"
          />
        </van-popup>
      </div>
      <!-- 班级 -->
      <div class="borderItem">
        <van-field
          readonly
          clickable
          name="picker"
          :value="className"
          label="班级"
          placeholder="点击选择班级(必填)"
          :rules="[{ required: true, message: '请选择班级' }]"
          @click="showPickerClass = true"
        />
        <van-popup v-model="showPickerClass" position="bottom">
          <van-picker
            title="班级"
            show-toolbar
            :columns="classes"
            value-key="name"
            @confirm="onConfirmClass"
            @cancel="showPickerClass = false"
          />
        </van-popup>
      </div>
      <!-- 出生日期 -->
      <div class="borderItem">
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="dateOfBirth"
          label="出生日期"
          placeholder="点击选择时间(必填)"
          :rules="[{ required: true, message: '请选择出生日期' }]"
          @click="showPickerDateOfBirth = true"
        />
        <van-popup v-model="showPickerDateOfBirth" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="onConfirmDateOfBirth"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="showPickerDateOfBirth = false"
          />
        </van-popup>
      </div>
      <!-- 年龄 -->
      <div class="borderItem">
        <van-cell-group>
          <van-field
            v-model="model.age"
            label="年龄"
            placeholder="年龄"
            readonly
          />
        </van-cell-group>
      </div>
      <div class="borderItem">
        <van-cell-group>
          <van-field
            v-model="model.introductionToThe.eMain"
            label="邮箱"
            placeholder="邮箱"
          />
        </van-cell-group>
      </div>
      <div class="borderItem">
        <van-cell-group>
          <van-field
            v-model="model.introductionToThe.phone"
            label="电话号码"
            placeholder="电话号码"
          />
        </van-cell-group>
      </div>
      <!-- <div  class="editPassword">
        <van-button
          round
          size="mini"
          type="primary"
          @click="editPassword"
          native-type="button"
          >修改密码 > </van-button
        >
      </div> -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >保存</van-button
        >
      </div>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="danger"
          @click="exitLogin"
          native-type="button"
          >退出登录</van-button
        >
        <!-- 在表单中，除了提交按钮外，可能还有一
        些其他的功能性按钮，如发送验证码按钮。
        在使用这些按钮时，要注意将native-type设
        置为button，否则会触发表单提交。 -->
      </div>
      
    </van-form>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Notify } from 'vant';
export default {
  name: 'My',
  components: {},
  data() {
    return {
      model: {
        introductionToThe: {//简介
          dateOfBirth: ''
        },
      },
      id: '',
      //学院专业班级的名字，用来在选择器选择时观看的，不需要提交到后端
      collegeName: '',//学院名字
      professionName: '',//专业名字
      className: '',//班级名字
      dateOfBirth: '',//出生日期,没格式化的
      showPickerCollege: false,
      showPickerProfession: false,
      showPickerClass: false,
      showPickerDateOfBirth: false,
      fileList: [],//上传图片的
      colleges: [],//请求学院获取的数据
      professions: [],//请求专业获取的数据
      classes: [],//请求班级获取到的数据
      minDate: new Date(1970, 0, 1),//时间的范围
      maxDate: new Date(),
    };
  },
  methods: {
    //修改密码
    editPassword(){
      this.$router.push('/main/edit_password/'+this.model.sId)
    },
    //保存按钮
    async onSubmit() {
      let list = await this.$http.put(`rest/student_users/${this.id}`, this.model);//发请求
      if (list.status >= 200 && list.status < 300) {
        Notify({
          message: '保存成功',
          color: '#FFF',
          background: '#9373ff',
        });
        localStorage.personalDetails = JSON.stringify(list.data);
      }
    },
    //选中学院后点击确认按钮执行
    onConfirmCollege(value) {
      this.collegeName = value.name;
      this.model.college = value.id
      this.showPickerCollege = false;
      this.professionName = '';
      this.className = '';
      this.getProfession()
    },
    //选中专业后点击确认按钮执行
    onConfirmProfession(value) {
      this.professionName = value.name;
      this.model.profession = value.id
      this.showPickerProfession = false;
      this.className = '';
      this.getClass()
    },
    //选中班级后点击确认按钮执行
    onConfirmClass(value) {
      this.className = value.name;
      this.model.class = value.id
      this.showPickerClass = false;
    },
    //选中出生日期后点击确认按钮执行
    onConfirmDateOfBirth(value) {
      let selectYear = value.getFullYear();//选中的年
      let selectMonth = value.getMonth() + 1//选中月
      let selectDate = value.getDate()//选中日
      this.dateOfBirth = `${selectYear}-${selectMonth}-${selectDate}`;
      this.model.introductionToThe.dateOfBirth = this.dateOfBirth;
      this.showPickerDateOfBirth = false;
      //自动计算年龄
      let currenTime = new Date();//当前时间
      let currenYear = currenTime.getFullYear()//当前年
      let currenMonth = currenTime.getMonth() + 1;//当前月
      let currenDate = currenTime.getDate();//当前日
      let year = currenYear - selectYear;
      let month = currenMonth - selectMonth;
      let date = currenDate - selectDate;
      if (year > 0 && (month >= 0 && date >= 0)) {
        this.model.age = year
      } else if (year > 0 && (month <= 0 && date < 0)) {
        this.model.age = year + 1
      } else if (year < 0) {
        this.model.age = 0
      } else {
        this.model.age = year
      }
    },
    afterRead(file) {
      this.uploadImg(file.file)
    },
    //上传图片
    async uploadImg(file) {
      /* formData.append(name, value);
       formData.append(name, value, filename);
      name
        value中包含的数据对应的表单名称。
      value
        表单的值。可以是USVString 或 Blob (包括子类型，如 File)。
      filename 可选
        传给服务器的文件名称 (一个 USVString), 当一个 Blob 或 File 被作为第二
        个参数的时候， Blob 对象的默认文件名是 "blob"。 File 对象的默认文件名
        是该文件的名称。
      */
      // 建立form对象
      let formdata1 = new FormData();
      formdata1.append('file', file, file.name);
      const config = {
        headers: this.getAuthHeaders()
      }
      let re = this.beforeAvatarUpload(file);
      if(!re){
        return false;
      }
      let icon = await this.$http.post('upload', formdata1, config);
      this.fileList = [];
      this.fileList.push({ url: icon.data.url, isImage: true })
      this.model.icon = icon.data.url;

    },
    async getMy() {
      const res = await this.$http.get(`rest/student_users/student`);//自定义携带的参数
      this.id = res.data._id;
      this.model = res.data;
      this.fileList = [];
      this.fileList.push({ url: res.data.icon, isImage: true });
      if (this.model.college) {
        let college = await this.$http.get('rest/college/' + this.model.college);
        let profession = await this.$http.get('rest/profession/' + this.model.profession);
        let classes = await this.$http.get('rest/class/' + this.model.class);
        this.collegeName = college.data.name;
        this.professionName = profession.data.name;
        this.className = classes.data.name;
        this.dateOfBirth = res.data.introductionToThe.dateOfBirth;
        localStorage.personalDetails = JSON.stringify(res.data);
      }
    },
    //获取学院
    async getCollege() {
      const res = await this.$http.get('rest/colleges');
      res.data.forEach(item => {
        this.colleges.push({ name: item.name, id: item._id });
      })
    },
    //获取专业
    async getProfession() {
      const res = await this.$http.get('rest/professions');
      let college = await this.$http.get(`rest/colleges/${this.model.college}`);
      this.professions = [];
      res.data.forEach((item, index) => {
        if (item.college.name == college.data.name) {
          this.professions.push({ name: item.name, id: item._id });
        }
      })
    },
    async getClass() {
      const res = await this.$http.get('rest/class');
      let profession = await this.$http.get(`rest/professions/${this.model.profession}`);
      this.classes = [];
      res.data.forEach((item, index) => {
        if (item.profession.name == profession.data.name) {
          this.classes.push({ name: item.name, id: item._id })
        }
      })
    },
    //退出登录
    exitLogin() {
      Dialog.confirm({
        title: '退出',
        message: '是否退出登录',
      })
        .then(() => {
          localStorage.removeItem('s_token');
          localStorage.removeItem('s_user');
          localStorage.removeItem('personalDetails');
          sessionStorage.removeItem('active')
          this.$router.replace('/teacher/login');
          Notify({
            message: '退出登录成功',
            color: '#FFF',
            background: '#9373ff',
          });
        })
        .catch(() => {
          console.log('取消了');
        });

    }
  },
  created() {
    this.getMy()
    this.getCollege();
  },
}
</script>
<style scoped>
.form {
  height: 100%;
  margin-bottom: 3.75rem;
}
.border {
  border-bottom: 1px solid #ccc;
}
/* .borderItem {
  margin: 25px 0;
} */
.borderItem div {
  color: #9373ff;
}
.editPassword{
  margin-left: 16.3125rem;
  margin-top: 0.625rem;
}
.editPassword button{
  padding: 0.75rem;
  font-size: 0.875rem;
  position: relative;
}
</style>