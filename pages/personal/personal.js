// pages/personal/personal.js
import request from "../../utils/request";
let  startY = 0;
let  moveY = 0;
let moveDistance = 0;
let userInfo = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coveTransition: '',
    userInfo:{},//表示用户信息
    recentPlayList:[],//用户播放列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取用户的基本信息
    userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo),
      })
      //捕获用户播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },
  async  getUserRecentPlayList(userId){
    let recentPlayListData = await request('/user/record',{uid:userId,type:0});
    let index = 0;
    let rencentPlayList = recentPlayListData.allData.splice(0,10).map(item=>{
      item.id = index++;
      return item;
    })
    this.setData({
      recentPlayList:rencentPlayList,
    })
  },
  handleTouchStart(event){
    this.setData({
      coveTransition: ''
    })
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if(moveDistance <= 80){
      return;
    }else{
      moveDistance = 80;
    }
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`,
    })
  },
  handleTouchEnd(event){
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //跳转到login页面
  toLogin(){
    if(!userInfo){
      wx:wx.navigateTo({
        url: '/pages/login/login',
      })
    }
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