const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    //姓名
    name:String,
    //密码
    password:String,
    //学号
    sId:{type:Number},
    icon:{
        type:String
    },
    //创建时间
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    },
    age:Number,//年龄
    gender:String,//性别
    college:{
        type: mongoose.SchemaTypes.ObjectId,//_id的特殊类型
        ref:'College'
    },//学院
    profession:{
        type: mongoose.SchemaTypes.ObjectId,//_id的特殊类型
        ref:'Profession'
    },
    class:{
        type: mongoose.SchemaTypes.ObjectId,//_id的特殊类型
        ref:'Class'
    },///班级
    //简介
    introductionToThe:{
        phone:Number,//电话号码
        address:String,//家庭地址
        eMain:String,//邮箱
        dateOfBirth:String,//出生日期
    }

})
module.exports = mongoose.model('StudentUser', schema)