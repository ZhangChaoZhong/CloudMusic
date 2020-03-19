// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter=require('tcb-router')

const rp = require('request-promise')

const BASE_URL='http://musicapi.xiecheng.live'

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const app =new TcbRouter({event}) //全局中间件

  //playlist中间件 向云数据库请求获取歌单列表 
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

  //musiclist 中间件
  app.router('musiclist', async (ctx, next) => {
    ctx.body = await rp(BASE_URL+'/playlist/detail?id='+parseInt(event.playlistId))
    .then((res)=>{
      return JSON.parse(res)
    })
  })

  //musicUrl
  app.router('musicUrl', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/song/url?id=${event.musicid}`)
      .then((res) => {
        return res
      })
  })
  return app.serve()
}