const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:String,//班级名称
    // pName:String,//专业名称
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
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    }
})
module.exports = mongoose.model('Class', schema)