//课程考试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    profession_course:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'ProfessionCourse'
    },
    tId:Number,
    //试卷标题
    title: {
        type: String,
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
    isTitleRandon: {
        type:Boolean,
        default:false
    }, //题目是否随机排序
    isOptionsRandon: {
        type:Boolean,
        default:false
    }, //选项是否随机排序
    isInspect:{
        type:Boolean,
        default:true
    },//作答后是否可以查看试卷
    isSave:{
        type:Boolean,
        default:false
    },//试卷是否已发布
    isTotal:{
        type:Boolean,
        default:true
    },//学生提交试卷后可以看到分数
    isRepetition:{
        type:Boolean,
        default:false
    },//是否可以重复考试
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
module.exports = mongoose.model('CourseTestPaper', schema);