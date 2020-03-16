// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() //数据库

const rp = require('request-promise')

const playlistCollection = db.collection('playlist') //云数据库playlist集合

const URL = 'http://musicapi.xiecheng.live/personalized'

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {
  //  const list = await playlistCollection.get() //获取云数据库playlist集合   一次只能获得100条数据  
  const countResult = await playlistCollection.count() //注意加await
  const total = countResult.total //总条数
  const batchTimes = Math.ceil(total / MAX_LIMIT) //向上取整 获得获取歌单的次数 
  const tasks = [] //当前任务数组
  for (let i = 0; i < batchTimes; i++) {  //分批次获取全部数据
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get() //跳过i*MAX_LIMIT取出MAX_LIMIT条
    tasks.push(promise) //添加到任务列表
  }
  let list = { //由于playlistCollection.get()获得的是里面的data
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => { // 同步所有任务完成后赋值给ist  acc之前的值   cur当前的值
      return {
        data: acc.data.concat(cur.data) //之前拼接现在的data
      }
    })
  }

  const playlist = await rp(URL).then((res) => { //获取服务器的最新playlist集合
    return JSON.parse(res).result //string转json取出result字段
  })

  const newData = [] //将云数据库和服务器的最新playlist进行比对，去重
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true //不重复为true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[i].id) {
        flag = false
        break
      }
    }
    if (flag) { //不重复才存入
      newData.push(playlist[i])
    }
  }

  //console.log(newData) //云开发控制台输出
  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({ //写入到云数据库  注意加await 
      data: {
        ...newData[i], //ES6扩展运算符
        createTime: db.serverDate(), //存入云数据库的服务器时间，利于后面的排序
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log('插入失败')
    })
  }
  return newData.length
}