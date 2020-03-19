// pages/player/player.js
let musiclist = []  //不需要在界面显示，不要定义在data中
let nowPlayingIndex = 0 //正在播放歌曲的index
//全局唯一的背景播放器
const backgroundAudioManager= wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:'',
    isPlaying:false,  //默认不播放 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    nowPlayingIndex=options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },
  //加载歌曲Info
  _loadMusicDetail(musicId){
    backgroundAudioManager.stop()//加载前，先停止当前播放的
    let music =musiclist[nowPlayingIndex]
    //console.log(music)
    wx.setNavigationBarTitle({  //导航标题显示当前播放的歌曲名
      title: music.name,
    })
    wx.showLoading({
      title: '歌曲加载中',
    })
    this.setData({            
      picUrl: music.al.picUrl  //歌曲封面图片
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,    //musicId与属性值相同 可以简写
        $url:'musicUrl'
      }
    }).then((res)=>{
      //console.log(res)
      let result = JSON.parse(res.result)
      backgroundAudioManager.src = result.data[0].url
      backgroundAudioManager.title =music.name
      backgroundAudioManager.coverImgUrl=music.al.picUrl
      backgroundAudioManager.singer=music.ar[0].name
      backgroundAudioManager.epname =music.al.name

      this.setData({
        isPlaying:true
      })
      wx.hideLoading()
    })
  },
  /**
   * 点击播放和暂停事件
   */
  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  /**
   * 上一首
   */
  onPrev(){
    nowPlayingIndex--
    if(nowPlayingIndex<0){  //点击第一首的上一首，回到最后一首
      nowPlayingIndex=musiclist.length-1
    }
    this._loadMusicDetail(musiclist[nowPlayingIndex].id)
  },
  /**
   * 下一首
   */
  onNext(){
     nowPlayingIndex++
    if (nowPlayingIndex > musiclist.length) {//点击最后一首的下一首，回到第一首
       nowPlayingIndex=0
     }
     this._loadMusicDetail(musiclist[nowPlayingIndex].id)
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