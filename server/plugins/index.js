module.exports = () => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/test_system', {
        useNewUrlParser: true
    })
    mongoose.connection.once("open",function(){
        console.log("数据库连接成功~~~");
    });
}