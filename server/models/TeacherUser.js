const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    //教师名
    name: String,
    //密码
    password: String,
    //教师号
    tId: {
        type: Number
    },
    icon: {
        type: String
    },
    //创建时间
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    age: {
        type: Number,
        default: 0
    }, //年龄
    // gender: {
    //     type: String,
    //     default: "1"
    // }, //性别
    gender:String,//性别
    college: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
        ref: 'College'
    }, //学院
    profession: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
        ref: 'Profession'
    },
    class: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
        ref: 'Class'
    }, ///班级
    //简介
    introductionToThe: {
        teachersTitle: String, //教师职称
        phone: Number, //电话号码
        // address:String,//家庭住址
        eMain: String, //邮箱
        dateOfBirth: Number, //出生日期,时间戳
        dateOfBirthStr: String, //出生日期,字符串
    }

})
module.exports = mongoose.model('TeacherUser', schema)