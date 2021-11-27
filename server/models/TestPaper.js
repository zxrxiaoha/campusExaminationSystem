const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    //试卷标题
    name: {
        type: String,
    },
    course:{//课程
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Course"
    },
    //单选题
    singleTopicSelection: Array,
    //多选题
    multipleChoice: Array,
    //判断题
    trueFalse: Array,
    //试卷提数
    number: {
        type:Number,
        default:0
    },
    //试卷分值，
    total: {
        type:Number,
        default:0
    },
    //考试时长,时间戳
    duration: Number,
    //考试时间,时间戳
    time: Array,
    //考试时长，字符串格式
    durationStr: String,
    //考试时间，字符串格式
    timeStr: Array,
    //题目是否随机排序
    isTitleRandon: {
        type:Boolean,
        default:false
    }, 
    //选项是否随机排序
    isOptionsRandon: {
        type:Boolean,
        default:false
    }, 
    //作答后是否可以查看试卷
    isInspect:{
        type:Boolean,
        default:true
    },
    //试卷是否已发布
    isSave:{
        type:Boolean,
        default:false
    },
    //学生提交试卷后可以看到分数
    isTotal:{
        type:Boolean,
        default:true
    },
    //是否可以重复考试
    isRepetition:{
        type:Boolean,
        default:false
    },
    //重复次数
    repetition:{
        type:Number,
        default:0
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    //考试时间是否开始,true开始
    isStart:{
        type:Boolean,
        default:false//默认还没开始考试
    },
    //考试时间是否过期,true为过期
    isEnd:{
        type:Boolean,
        default:false//默认还没结束
    },
})
module.exports = mongoose.model('TestPaper', schema);