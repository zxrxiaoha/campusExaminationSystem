const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:String,//课程名称
    logoImg:{
        type:String
    },
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    },
    writer:String
})
module.exports = mongoose.model('Course', schema)