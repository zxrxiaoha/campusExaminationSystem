# 校园考试系统

#### 介绍
使用Vue.js和node.js开发的校园考试系统。所有先要运行该项目必须有node.js环境。

使用的是数据库MongoDB，所有也需要安装mongoDB数据库

#### 软件架构
软件架构说明 

#### 安装说明

1. 安装node.js
2. 安装MongoDb数据库 https://www.runoob.com/mongodb/mongodb-window-install.html
3. 数据库比较难安装。（注意要细心哦）
   1. 大概就是安装在c盘，
   2. 然后在c盘根目录创建data文件夹
   3. 在data文件夹中创建db文件夹
   4. 进入安装mongodb的bin目录，打开`mongo.exe`和`mongod.exe`
4. 安装完数据库，打开cmd命令行窗口 输入mongod启动mongodb服务器在打开一个cmd窗口，输入mongo连接mongodb（不要关闭命令行窗口）
   1. 或者进入数据库安装的目录
   2. ![打开数据库](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/0ecf575b47ca72765bb9111026b3c12503df2422/img/%E6%89%93%E5%BC%80%E6%95%B0%E6%8D%AE%E5%BA%93.png)
   3. 启动mongo.exe和mongod.exe(启动后不要关闭)
5. 指定数据库：`use test_system`（在mongo.exe打开的控制台中输入）
6. 为数据库插入一条数据，最好就是：`db.adminusers.insert({name:"root",password:"root"})`（在mongo.exe打开的控制台中输入）

#### 使用说明

1. 下载或克隆项目。该项目拥有：管理员端+教师端+学生端+服务器端

2. 管理员和教师是adminOrTeacher文件夹，学生端是student文件夹，服务器端是server文件夹

3. 下载下来后，这三个文件夹（adminOrTeacher、server、student）都需要初始化，都是进入根目录，然后运行 npm install（有淘宝镜像的最好用cnpm install ）。

4. 建议先启动server(服务器端)，因为管理员，教师，学生这些都需要server提供数据

5. ![初始化](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122322922.png)

6. 然后，这三个文件夹（adminOrTeacher、server、student）都是进入根目录，然后运行 npm run serve 来启动项目。 

7. ![运行项目](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122022797.png)

   

#### 项目截图

1. ##### 管理员端：![管理员首页](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122654977.png)

2. 管理员端添加试卷![管理员添加试卷](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122745572.png)

3. <font color="red">**查看项目其它图片可以点击img文件夹**</font>

#### 其它介绍

1. 管理员端发布的试卷是校级试卷，学校中所有的学生都可以考试。
2. 教师端发布的试卷的课程试卷，只有课程中的学生才可以考试
