const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    //试卷标题
    name:{
        type:String,
    },
    //单选题
    singleTopicSelection:Array,
    //多选题
    multipleChoice:Array,
    //判断题
    trueFalse:Array,
    //试卷提数
    number:Number,
    //试卷分值，
    total:Number,
    //考试时长,时间戳
    duration:Number,
    //考试时间,时间戳
    time:Array,
     //考试时长，字符串格式
     durationStr:String,
     //考试时间，字符串格式
     timeStr:Array,
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    }
})
module.exports = mongoose.model('PublishedPaper', schema);