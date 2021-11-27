const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:{
        type:String//学院名称
    },
    logoImg:{
        type:String//学院图片
    },
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    },
})
module.exports = mongoose.model('College', schema)