# 微信小程序云开发-从0打造云音乐全栈小程序

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

  npm install --save request

  npm install --save request-promise

- 进行代码编写，后要点击上传云函数右键getPlaylist文件夹，点击上传并部署

### 1.5 分批次获取云数据库playlist全部数据，与服务器的数据进行对比去重

- 新建定时触发器
- 配置云函数超时时间

## 二、播放列表功能实现

### 2.1 从云数据库取出歌单列表显示到界面

- 实现触底加载更多歌单
- 刷新获取最新歌单

- 在云函数music下安装 

  npm install --save request

  npm install --save request-promise

  npm install --save tcb-router