// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() //数据库

const rp = require('request-promise')

const playlistCollection = db.collection('playlist') //云数据库playlist集合

const URL = 'http://musicapi.xiecheng.live/personalized'

// 云函数入口函数
exports.main = async(event, context) => {
  const list = await playlistCollection.get() //获取云数据库playlist集合

  const playlist = await rp(URL).then((res) => { //获取服务器的playlist集合
    return JSON.parse(res).result //string转json取出result字段
  })

  const newData = [] //将云数据库和服务器的playlist进行比对，去重
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
        createtime: db.serverDate(),    //存入云数据库的服务器时间，利于后面的排序
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log('插入失败')
    })
  }
  return newData.length
}