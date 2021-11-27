const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:{
        type:String
    },
    // cName:String,
    // 关联学院表
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
module.exports = mongoose.model('Profession', schema)