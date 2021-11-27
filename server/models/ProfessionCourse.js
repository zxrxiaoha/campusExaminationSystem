const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:String,//课程名称
    tId:Number,
    writer:String,//课程作者
    //关联专业表
    profession:{
        type: mongoose.SchemaTypes.ObjectId,//_id的特殊类型
        ref:'Profession'
    },
    //关联学院表
    college:{
        type: mongoose.SchemaTypes.ObjectId,//_id的特殊类型
        ref:'College'
    },
    logoImg:{
        type:String
    },
    date:{//课程创建时间
        type:String,
        default:new Date().toLocaleDateString()
    }
})
module.exports = mongoose.model('ProfessionCourse', schema)