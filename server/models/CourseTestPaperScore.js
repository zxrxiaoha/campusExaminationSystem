const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    // 学生的学号，姓名，成绩，学院，专业，班级
    sId: Number,
    name: String,
    score: {
        type:Number,
        default:2//不设置分数默认2分
    },
    profession_course:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'ProfessionCourse'
    },
    //查看成绩的时候需要用
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
    //单选题答案
    singleTopicSelection:Array,
    //多选题答案
    multipleChoice:Array,
    //判断题答案
    trueFalse:Array,
    //考的试卷
    course_test_paper:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"CourseTestPaper"
    },
    //当前考试时间
    time: {
        type: String,
        default: new Date().toLocaleDateString()
    }
})
module.exports = mongoose.model('CourseTestPaperScore', schema)