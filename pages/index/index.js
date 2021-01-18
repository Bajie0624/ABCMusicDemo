// index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单
    topList:[],//排行榜数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //轮播图数据
    let bannerListData  = await request('/banner',{type:2})
    this.setData({
      bannerList:bannerListData.banners
    })
    //推荐歌单数据
    let recommendListData = await request('/personalized',{limit:10})
    this.setData({
      recommendList:recommendListData.result
    })
    // 排行榜数据
    let index = 0; //用来标识idx
    let resultArr = [];
    while(index < 5){
      let topListData = await request('/top/list',{idx:index++});
      let topListItem = {name:topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)}
      resultArr.push(topListItem);
      //更新toplist的状态值
      this.setData({
        topList:resultArr,
      })
    }
    
    
  },
  // 跳转到推荐页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recomendSong/reconmendSong',
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