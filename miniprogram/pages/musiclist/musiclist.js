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
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})