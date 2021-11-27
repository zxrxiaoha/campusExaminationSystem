const express = require('express')
const history = require('connect-history-api-fallback');
const app = express()
app.set('secret','asdf');//第二个参数随便写，第一个参数要记得，取的时候get('secret');
// app.use(history()); //解决history模式下刷新浏览器，返回404的问题

app.use(require('cors')()); //解决跨区问题
app.use(express.json()); //返回仅解析 JSON 并仅查看Content-Type标头与type选项匹配的请求的中间件
app.use('/uploads',express.static(__dirname + '/uploads'))//访问这个路由时，拿到uploads文件夹里面的静态资源

require('./plugins/index')();
require('./routes/admin')(app);
// require('./routes/student')(app);
// require('./routes/teacher')(app);

app.listen(5000, () => console.log(`http://127.0.0.1:5000`))