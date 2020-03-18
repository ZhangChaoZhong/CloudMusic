// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表  传给组件的参数
   */
  properties: {
    playlist:{
      type:Object
    }
  },

  /**
   * 监听器
   */
  observers: {
    ['playlist.playCount'](count) {
      this.setData({
        _count: this._tranNumber(count, 2)    //要用组件data的_conut不能用监听的对象更新
      })
    }
  },


  /**
   * 组件的初始数据   组件内部自己的参数
   */
  data: {
    _count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 进入歌曲列表
     */
    goToMusiclist(){
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`, //es模板字符串拼接
      })
    },
    /**
     * 数据格式化
     */
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]             //取整
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {    //大于等于10万
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)  //千，百位
        return parseFloat(parseInt(num / 10000) + '.' + decimal) +
          '万'
      } else if (numStr.length > 8) {   //大于等于1亿
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})
