// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  return await cloud.database().collection('playlist')  //注意加await
    .skip(event.start)                //请求起始点
    .limit(event.count)               ///强求条数
    .orderBy('createTime', 'desc')    //逆序输出
    .get()
    .then((res) => {
      return res
    })
}