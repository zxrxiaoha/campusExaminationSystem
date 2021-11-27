const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:{
        type:String
    },
    password:{
        type: String,
        // select:false,//点击编辑的时候密码不要被查出来，这样密码就不会被多次散列
        // //给密码加密
        // set(val){
        //     return require('bcrypt').hashSync(val,10);//这里数字越高越安全，但是耗时越多
        // }
    },
    icon:{
        type:String
    },
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    }
})
module.exports = mongoose.model('AdminUser', schema)