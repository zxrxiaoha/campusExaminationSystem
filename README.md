# 校园考试系统

#### 介绍
使用Vue.js和node.js开发的校园考试系统。所有先要运行该项目必须有node.js环境。

使用的是数据库MongoDB，所有也需要安装mongoDB数据库

#### 软件架构
软件架构说明

#### 安装说明

1. 安装node.js
2. 安装MongoDb数据库

#### 使用说明

1.  下载或克隆项目。该项目拥有：管理员端+教师端+学生端+服务器端
2.  管理员admin文件夹，教师端是teacher文件夹，学生端是student文件夹，服务器端是server文件夹
3.  下载下来后，这四个文件夹都需要初始化，都是进入根目录，然后运行 npm install（有淘宝镜像的最好用cnpm install ）。
4.  建议先启动server(服务器端)，因为管理员，教师，学生这些都需要server提供数据
5.  ![初始化](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122322922.png)
6.  然后，这四个文件夹都是进入根目录，然后运行 npm run serve 来启动项目。
7.  ![运行项目](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122022797.png)

#### 项目截图

1. 管理员端：![管理员首页](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122654977.png)
2. 管理员端添加试卷![管理员添加试卷](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122745572.png)
3. 教师端：![教师端首页](https://gitee.com/zxr-xiaoha/campus-examination-system/raw/9daa9f4a375cf91676bc4adf1f5f67a39434ad1d/img/image-20211127122945482.png)
4. 

#### 其它介绍

1. 管理员端发布的试卷是校级试卷，学校中所有的学生都可以考试。
2. 教师端发布的试卷的课程试卷，只有课程中的学生才可以考试
