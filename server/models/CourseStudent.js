const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    sId:Number,
    tId:Number,
    profession_course: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
        ref: 'ProfessionCourse'
    }, //假如的课程
    //学生属于哪个专业的，关联专业表
    profession: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
        ref: 'Profession'
    },
    //关联学院表
    college: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
        ref: 'College'
    },
    class: {
        type: mongoose.SchemaTypes.ObjectId, //_id的特殊类型
            ref: 'Class'
    },
    date: { //学生进入课程的时间
        type: String,
        default: new Date().toLocaleDateString()
    }
})
module.exports = mongoose.model('CourseStudent', schema)