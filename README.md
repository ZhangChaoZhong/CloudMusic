# 微信小程序云开发-从0打造云音乐全栈小程序

本项目以云音乐实战项目为例，是横跨小程序端、云开发后端、后台管理系统的一站式云开发小程序全栈项目。使用小程序组件化开发打造小程序前端部分，使用小程序云开发打造小程序后端部分，通过后台管理系统访问云开发资源实现对项目中数据及文件的管理。通过这门课程的学习可以使你深刻理解小程序开发的全部技能点，具备独立开发完整的微信小程序的能力。

## 云开发官方文档

https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html

## 一、从0构建项目

### 1.1 新建云开发小程序项目，添加tabbar

### 1.2 实现轮播图

### 1.3 自定义组件歌单playlist

### 1.4 从服务器获取歌单列表并存入云数据库

- 用ES7语法 async	await 对异步进行同步操作

- 新建getPlaylist云函数

- 并在getPlaylist进行   

  ```
  npm install --save request
  
  npm install --save request-promise
  ```

- 进行代码编写，后要点击上传云函数右键getPlaylist文件夹，点击上传并部署

### 1.5 分批次获取云数据库playlist全部数据，与服务器的数据进行对比去重

- 新建定时触发器
- 配置云函数超时时间

## 二、播放列表功能实现

### 2.1 从云数据库取出歌单列表显示到界面

- 实现触底加载更多歌单

- 刷新获取最新歌单

- 在云函数music下安装 

  ```
npm install --save request
  npm install --save request-promise
npm install --save tcb-router
  //为什么使用tcb-router
  //1.一个用户在一个云环境只能创建50个云函数
  //2.相似的请求归类到同一个云函数处理
  //3.tcb-router是一个koa风格的云函数路由库
  ```

### 2.2 创建歌曲列表组件，并实现歌曲列表功能

- 点击某歌单进入歌单详情

<img src=".\doc_res\koa.jpg" alt="koa" style="zoom:80%;" />

## 小结



<img src=".\doc_res\1.jpg" alt="1" style="zoom:80%;" />

<img src=".\doc_res\2.jpg" alt="2" style="zoom:80%;" />

<img src=".\doc_res\3.jpg" alt="3" style="zoom:80%;" />

