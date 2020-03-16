// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter=require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const app =new TcbRouter({event}) //全局中间件

  //playlist中间件
  app.router('playlist',async(ctx,next)=>{
    ctx.body= await cloud.database().collection('playlist')  //注意加await
      .skip(event.start)                //请求起始点
      .limit(event.count)               ///强求条数
      .orderBy('createTime', 'desc')    //逆序输出
      .get()
      .then((res) => {
        return res
      })
  })

  return app.serve()
}