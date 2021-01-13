// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],//导航标签数据
    navId:'',//导航标识
    videoList:[],//视频列表页
    videoId:'',//视频id标识
    videoUpdateTime:[],//记录video播放的时长
    isTriggered:false,//标识下拉刷新是否被触发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航标签数据
    this.getVideoGroupListData();
  },
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list');
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,14),
      navId: videoGroupListData.data[0].id
    })
    // 获取视频列表数据
    this.getVideoList(this.data.navId)
  },
  // 点击切换导航
  changeNav(event){
    let navId = event.currentTarget.id; // 通过id向event传参的时候如果传的是number会自动转换成string
    this.setData({
      navId:navId >>>0,
      videoList:[]
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.navId)
  },
  // 获取视频列表数据
  async getVideoList(navId){
    if (!navId) {
      return;
    }
    let videoListData = await request('/video/group',{id:navId});
    wx.hideLoading()
    let index = 0;
    let videoList = videoListData.datas.map(item => {
      item.id = index++;
      return item
    })
    this.setData({
      videoList:videoList,
      // 关闭下拉刷新
      isTriggered:false,
    })
  },
  // 点击播放 继续播放
  handlePlay(event){
    let vid =  event.currentTarget.id;
    // if(this.videoContext && this.vid!=vid){
    //   this.videoContext.stop();
    // }
    // this.vid = vid;
    // 更新data中videoId的状态数据
    this.setData({
      videoId:vid
    })
    this.videoContext = wx.createVideoContext(vid);
    // 判断当前视频是否有播放记录，如果有播放记录就直接从之前记录的时间播放
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item=>item.vid === vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
    this.videoContext.play()
  },
  // 用来监听视频播放进度的回调
  handleTimeUpdate(event){
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    // 判断当前数组中是否有对应id的播放时间 如果没有就push  如果有就修改时间
    let videoItem = videoUpdateTime.find(item=>item.vid);
    if(videoItem){  //说明有
      videoItem.currentTime = event.detail.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj);
    }
    //统一更新状态
    this.setData({
      videoUpdateTime
    })
  },
  // 视频结束播放调用
  handleEnded(event){
    // 移出记录播放时长数组中的id对应视频
    let {videoUpdateTime} = this.data;
    let index =  videoUpdateTime.findIndex(item => item.id === event.currentTarget.id);
    videoUpdateTime.splice(index,1);
    this.setData({
      videoUpdateTime
    })
  },
  // 自定义下拉刷新的回调
  handleRefresh(event){
    this.getVideoList(this.data.navId);
  },
  //实现自定义上拉触底
  // 正常是发送请求或者在前端截取数据加载到视频后方即可  下拉刷新 上拉加载
  handleToLower(event){
    console.log('没有了')
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
  onShareAppMessage: function ({from}) {
    if(from === 'button'){
      return{
        title:'来自button的转发',
        page:'/pages/video/video',
        imageUrl:'/static/images/nvsheng.jpg'
      }
    }else{
      return{
        title:'来自menu的转发',
        page:'/pages/video/video',
        imageUrl:'/static/images/nvsheng.jpg'
      }
    }
    
  }
})