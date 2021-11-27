module.exports = (app) => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert'); //返回错误的包，使用状态代码断言
    //初始化一下，避免使用populate()关联模型时，说模型不存在
    let tool = require('./tool'); //处理试卷是否开始和过期的函数
    const AdminUser = require('../../models/AdminUser')
    require('../../models/Class')
    require('../../models/Course')
    require('../../models/Profession')
    require('../../models/PublishedPaper')
    const StudentUser = require('../../models/StudentUser');
    const TeacherUser = require('../../models/TeacherUser')
    const TestPaper = require('../../models/TestPaper')
    require('../../models/College')
    // require('../../models/CoursePublishedPaper')
    const CourseStudent = require('../../models/CourseStudent')
    const CourseTestPaper = require('../../models/CourseTestPaper')
    require('../../models/ProfessionCourse')
    const CourseTestPaperScore = require('../../models/CourseTestPaperScore')
    const TestPaperScore = require('../../models/TestPaperScore')

    const router = express.Router({
        mergeParams: true
    })
    router.get('/', async (req, res) => {
        // let queryOptions = {}
        let resource = "";
        if (req.Model.modelName === "Profession") {
            // queryOptions.populate = 'college' //populate用来确定它应该查询的外部集合的选项。（那个模型使用了ref）
            // resource = await req.Model.find({}).populate('college').limit(10);
            resource = await req.Model.find({}).populate('college');
        } else if (req.Model.modelName === "Class") {
            resource = await req.Model.find({}).populate('profession').populate('college');
        } else if (req.Model.modelName == "AdminUser" && req.a_user.name != "root") {
            //管理员权限，如果不是root，那就不能查看有多少个管理员
            resource = "你没有权限查看"
        } else {
            resource = await req.Model.find({})
        }
        if (resource[0] && typeof resource != "string") {
            resource.forEach(item => {
                if (item.password) {
                    item.password = undefined;
                }
            })
        }

        res.send(resource);
    })
    //编辑与分页,和管理员获取信息
    router.get('/:num', async (req, res) => {
        let resource;
        if (req.params.num == 'admin' && req.Model.modelName == "AdminUser") {
            resource = await req.Model.findById(req.a_user._id); //管理员
            resource.password = undefined;
        } else if (req.params.num == 'teacher' && req.Model.modelName == "TeacherUser") {
            resource = await req.Model.findById(req.t_user._id); //教师查看个人信息
        } else if (req.params.num == 'student' && req.Model.modelName == "StudentUser") {
            resource = await req.Model.findById(req.s_user._id); //学生查看个人信息
            resource.password = undefined
        } else if (req.Model.modelName === 'CourseStudent') {
            if (req.params.num.length == 10) { //说明是根据学号查询
                resource = await req.Model.find({ //查询老师的课程，查询所有
                    tId: req.params.num
                }).populate('profession_course');
            } else {
                resource = await req.Model.findById(req.params.num);
            }

        } else if (req.Model.modelName === 'CourseTestPaper') {
            if (req.params.num.length == 10) { //说明是根据学号查询
                resource = await req.Model.find({ //查询老师的课程，查询所有
                    tId: req.params.num
                }).populate('profession_course');
                tool(resource)
            } else {
                resource = await req.Model.findById(req.params.num);
            }

        } else if (req.Model.modelName === 'StudentUser' && req.params.num.length == 10) {
            resource = await req.Model.find({
                sId: req.params.num
            });
        } else if (req.Model.modelName === 'TestPaper' && req.params.num == "save") {
            resource = await req.Model.find({ //获取已发布的试卷
                isSave: true
            });
            tool(resource);
        } else if (req.Model.modelName === 'TestPaperScore' && req.params.num.length == 10) {
            resource = await req.Model.find({ //查询当前学生以完成的校级考试
                sId: req.params.num
            }).populate('test_paper');
        } else if (req.Model.modelName === 'TestPaperScore' && req.params.num.length > 10) {
            resource = await req.Model.findById(req.params.num).populate('test_paper');
        } else if (req.Model.modelName === 'CourseTestPaperScore' && req.params.num.length > 10) {
            resource = await req.Model.findById(req.params.num).populate('course_test_paper');
        }
        //分页
        else if (req.params.num.length < 8) { //毕竟没有分页十位数以上的,所有id都大于8位
            let page = (req.params.num - 1) * 10; //需要跳过的文档数量
            if (req.Model.modelName == "Class") {
                //班级和课程需要管理专业和学院
                resource = await req.Model.find({}).populate('profession').populate('college').skip(page).limit(10);
            } else if (req.Model.modelName == "TeacherUser" || req.Model.modelName == "StudentUser") {
                resource = await req.Model.find({}).populate('class').populate('profession').populate('college').skip(page).limit(10);
            } else if (req.Model.modelName == "PublishedPaper" || req.Model.modelName == "Course") {
                //试卷，这块好像没用了
                resource = await req.Model.find({}).skip(page).limit(10);
            } else if (req.Model.modelName == "TestPaper") {
                resource = await req.Model.find({}).populate('course').skip(page).limit(10);
                tool(resource);
            } else {
                //其他管理学院
                resource = await req.Model.find({}).populate('college').skip(page).limit(10);
            }
        } else { //根据id查询个人或学院，专业，班级，详情,
            resource = await req.Model.findById(req.params.num);
            resource.password = undefined;
            res.send(resource)
            return false;
        }
        //说明不是一个单独的对象，是一个对象数组
        if (resource[0]) {
            resource.forEach(item => {
                if (item.password) {
                    item.password = undefined;
                }
            })
        }
        res.send(resource);
    })
    //传递两个参数，既有分页，也有别的
    router.get('/:str/:num', async (req, res) => {
        let resource;
        let page = (req.params.num - 1) * 10;
        if (req.Model.modelName === "TestPaper" && req.params.str == "save" && req.params.num.length < 8) {
            resource = await req.Model.find({
                isSave: true
            }).populate('course').skip(page).limit(10);
            tool(resource);
        } else if (req.Model.modelName === 'TestPaperScore' && req.params.str.length == 10 && req.params.num.length > 10) {
            resource = await TestPaper.find({ //已发布的试卷，但是不知道考没考
                isSave: true,
                course: req.params.num //查询该课程里面已 发布的试卷
            })
            let arr = []; //存储已考的
            for (let i = 0; i < resource.length; i++) {
                let res = await req.Model.findOne({
                    sId: req.params.str,
                    test_paper: resource[i]._id
                }).populate('test_paper')
                if (res != null) {
                    arr.push(res);
                }
            }
            res.send(arr); //学生已考的试卷
            return false;
        } else if (req.Model.modelName === 'CourseTestPaperScore' && req.params.str.length == 10 && req.params.num.length > 10) {
            resource = await CourseTestPaper.find({ //该课程已发布的试卷，但是不知道考没考
                isSave: true,
                profession_course: req.params.num
            })
            let arr = []; //存储已考的
            for (let i = 0; i < resource.length; i++) {
                let res = await req.Model.findOne({
                    sId: req.params.str,
                    course_test_paper: resource[i]._id
                }).populate('course_test_paper')
                if (res != null) {
                    arr.push(res);
                }
            }
            res.send(arr); //学生已考的试卷
            return false;
        } else if (req.Model.modelName === 'CourseTestPaperScore' && req.params.str == 'profession_course' && req.params.num.length > 10) {
            resource = await req.Model.find({ //该课程已发布的试卷，但是不知道考没考
                profession_course: req.params.num
            }).populate('course_test_paper')
        } else if (req.Model.modelName == "CourseTestPaper" && req.params.str == "save" && req.params.num.length == 10) {
            //查询当前老师已发布的试卷
            resource = await req.Model.find({
                isSave: true,
                tId: req.params.num
            }).populate('profession_course');
            tool(resource);

        } else if (req.Model.modelName === 'ProfessionCourse') {
            if (req.params.str == "teacher" && req.params.num.length == 10) {
                resource = await req.Model.find({ //查询老师的课程，查询所有
                    tId: req.params.num
                }).populate('profession').populate('college');
            }
            // else if (req.params.str == "student" && req.params.num.length == 10) {

            // }

        } else if (req.Model.modelName === 'CourseStudent' && req.params.str == "student" && req.params.num.length == 10) {
            let res = await req.Model.find({ //查询课程里面的学生，找不到就说明老师没有把学生添加进课程
                sId: req.params.num
            }).populate('profession_course')
            let arr = []
            res.forEach(item => {
                arr.push(item.profession_course)
            })
            resource = arr;
        }

        res.send(resource);

    })
    //校级考试，已发布的试卷和学还没考的试卷，那个课程的试卷
    router.get('/:str/:num/:id', async (req, res) => {
        console.log(1);
        let resource;
        //查询成绩才用到的
        if (req.Model.modelName === "TestPaper" && req.params.str == "save" && req.params.num.length == 10 && req.params.id.length > 10) {
            resource = await req.Model.find({ //已发布的试卷，但是不知道考没考
                isSave: true,
                course: req.params.id
            })
            let arr = []; //存储已考的
            for (let i = 0; i < resource.length; i++) {
                let res = await TestPaperScore.findOne({
                    sId: req.params.num,
                    test_paper: resource[i]._id
                })
                if (res != null) {
                    arr.push(res);
                }
            }
            for (let i = 0; i < resource.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (resource[i]._id.toString() == arr[j].test_paper.toString()) {
                        resource.splice(i, 1);
                    }
                }
            }
            tool(resource);
        } else if (req.Model.modelName === "CourseTestPaper" && req.params.str == "save" && req.params.num.length == 10 && req.params.id.length > 10) {
            resource = await req.Model.find({ //该课程已发布的试卷，但是不知道考没考
                isSave: true,
                profession_course: req.params.id
            })
            let arr = []; //存储已考的
            for (let i = 0; i < resource.length; i++) {
                let res = await CourseTestPaperScore.findOne({
                    sId: req.params.num,
                    course_test_paper: resource[i]._id
                })
                if (res != null) {
                    arr.push(res);
                }
            }
            for (let i = 0; i < resource.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (resource[i]._id.toString() == arr[j].course_test_paper.toString()) {
                        resource.splice(i, 1);
                    }
                }
            }
            tool(resource);
        }
        res.send(resource);
    })
    //管理员查询成绩
    router.get('/:college/:profession/:classes/:course', async (req, res) => { //因为传递过来的都是_id,比较长,所有要判断长度大于10
        let resource;
        if (req.Model.modelName === 'TestPaperScore' && req.params.college.length > 10 && req.params.profession.length > 10 && req.params.classes.length > 10 && req.params.course.length > 10) {
            resource = await req.Model.find({ //查询当前学生以完成的校级考试
                college: req.params.college,
                profession: req.params.profession,
                class: req.params.classes,
                course: req.params.course
            }).populate('test_paper');
        }
        res.send(resource);
    })
    router.post('/', async (req, res) => {
        const resource = await req.Model.create(req.body);
        if (resource.password) {
            resource.password = undefined;
        }
        res.send(resource);
    })
    router.put('/:id', async (req, res) => {
        const resource = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        if (resource.password) {
            resource.password = undefined;
        }
        res.send(resource);
    })
    //修改密码的路由
    router.put('/:id/:psd', async (req, res) => {
        let resource = await req.Model.findById(req.params.id);
        if (req.Model.modelName == "StudentUser" && req.params.psd == "psd") {
            if (resource.sId != req.body.sId) {
                res.send({
                    success: '账号错误'
                });
                return false;
            }
        } else if (req.Model.modelName == "AdminUser" && req.params.psd == "psd") {
            if (resource.name != req.body.name) {
                res.send({
                    success: '用户名错误'
                });
                return false;
            }
        }else if (req.Model.modelName == "TeacherUser" && req.params.psd == "psd") {
            if (resource.tId != req.body.tId) {
                res.send({
                    success: '账号错误'
                });
                return false;
            }
        }
        if (resource.password != req.body.old_password) {
            res.send({
                success: '原密码错误'
            });
            return false;
        }
        if (req.body.new_password == req.body.old_password) {
            res.send({
                success: '原密码与新密码重复'
            });
            return false;
        }
        resource = await req.Model.findByIdAndUpdate(req.params.id, {
            password: req.body.new_password
        })
        res.send({
            success: true
        });
    })
    router.delete('/:id', async (req, res) => {
        let item = await req.Model.findByIdAndDelete(req.params.id);
        if (item != null) {
            res.send({
                success: true
            });
        }
    })
    const multer = require('multer');
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../uploads');
        },
        filename: function (req, file, cb) {
            let singfileArray = file.originalname.split('.'); //获取上传的忘记名字
            let fileExtension = singfileArray[singfileArray.length - 1]; //后缀
            let randomNum = Math.random().toString();
            randomNum = randomNum.split('.')[1];
            cb(null, singfileArray[0] + '-' + Date.now() + '-' + randomNum + "." + fileExtension);
        }
    })
    const upload = multer({
        // dest: __dirname + '/../../uploads2' //把拿到的东西放进这个文件夹,__dirname 总是指向被执行 js 文件的绝对路径
        storage
    })
    app.post('/api/upload', async (req, res, next) => {
        //发请求前要携带请求头
        const token = req.headers.authorization;
        assert(token, 401, '请先登录'); //这个token有可能是假的，用户伪造的。
        const {
            id
        } = jwt.verify(token, app.get('secret')) //解密，判断id是否真实存在
        assert(id, 401, '请先登录')
        req.a_user = await AdminUser.findById(id)
        req.t_user = await TeacherUser.findById(id)
        req.s_user = await StudentUser.findById(id)
        if (!req.a_user && !req.t_user && !req.s_user) {
            assert(req.a_user, 401, "请先登录")
        }
        next();
    }, upload.single('file'), (req, res) => {
        const file = req.file;
        file.url = `http://localhost:5000/uploads/${file.filename}`

        res.send(file)
    })
    app.use('/api/rest/:resource', async (req, res, next) => {
        //发请求前要携带请求头
        const token = req.headers.authorization;
        assert(token, 401, '请先登录'); //这个token有可能是假的，用户伪造的。
        const {
            id
        } = jwt.verify(token, app.get('secret')) //解密，判断id是否真实存在
        assert(id, 401, '请先登录')
        //有问题
        req.a_user = await AdminUser.findById(id)
        req.t_user = await TeacherUser.findById(id)
        req.s_user = await StudentUser.findById(id)
        if (!req.a_user && !req.t_user && !req.s_user) {
            assert(req.a_user, 401, "请先登录")
        }
        next();
    }, (req, res, next) => {
        let modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next();
    }, router)
    //管理员登录
    app.post('/api/admin/login', async (req, res) => {
        const {
            username,
            password
        } = req.body;
        const user = await AdminUser.findOne({
            name: username,
            password
        });
        if (!user) {
            res.send({
                user
            })
        } else {
            const token = jwt.sign({
                id: user._id
            }, app.get('secret'));
            res.send({
                token,
                username: user.name,
                img: user.icon,
                date: user.date,
            })
        }
    })
    //教师登录
    app.post('/api/teacher/login', async (req, res) => {
        const {
            tId,
            password
        } = req.body;
        const user = await TeacherUser.findOne({
            tId,
            password
        });
        if (!user) {
            res.send({
                user
            })
        } else {
            const token = jwt.sign({
                id: user._id
            }, app.get('secret'));
            res.send({
                t_token: token,
                tId: user.tId,
                img: user.icon,
                date: user.date,
                id: user._id,
            })
        }
    })
    //学生登录
    app.post('/api/student/login', async (req, res) => {
        const {
            sId,
            password
        } = req.body;
        const user = await StudentUser.findOne({
            sId,
            password
        });
        if (!user) {
            res.send({
                user
            })
        } else {
            const token = jwt.sign({
                id: user._id
            }, app.get('secret'));
            res.send({
                user: {
                    s_token: token,
                    sId: user.sId,
                    img: user.icon,
                    date: user.date,
                    id: user._id,
                    college: user.college,
                    profession: user.profession,
                    class: user.class
                }

            })
        }
    })
    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}