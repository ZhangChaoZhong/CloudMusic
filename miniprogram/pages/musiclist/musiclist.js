// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist:[], //歌曲列表
    listInfo:{},  //歌单详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //路由到music的musiclist
    wx.cloud.callFunction({
      name:"music",
      data:{
        playlistId:options.playlistId,  //歌单id
        $url:'musiclist'  //musiclist路由
      }
    }).then((res)=>{
      const pl = res.result.playlist
       this.setData({
         musiclist:pl.tracks,
         listInfo:{
           coverImgUrl: pl.coverImgUrl,   //歌单封面图片
           name:pl.name                    //歌单简介
         }
       })
       this._setMusiclist()
       wx.hideLoading()
    })
  },

  _setMusiclist(){
    wx.setStorageSync('musiclist', this.data.musiclist)
  }
})