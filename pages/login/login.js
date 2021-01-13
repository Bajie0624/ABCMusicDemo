// pages/login/login.js
import request from '../../utils/request'

/*
  登陆流程
  1.收集表单项数据
  2.前端验证  需要验证用户信息是否合法  即账号密码是否合法 
  3后端验证   验证用户是否存在  验证密码是否正确
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',//手机号码
    password:'',//密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //表单内容
  handleInput(event){
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]:event.detail.value,
    })
  },
  //登陆
  async login(){
    //收集表单数据
    let {phone,password} = this.data;
    //前端验证
    // 1.内容为空 2.格式不正确 3.格式正确验证通过
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
      })
      return;
    }
    let phoneReg = /^1(3|4|5|6\7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
      })
      return;
    }
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      })
      return;
    }

    //后端验证
    let result = await request('/login/cellphone',{phone,password,isLogin:true});
    if(result.code == 200){
      wx.showToast({
        title:'登陆成功'
      })
      //将用户信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile));
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
    }else if(result.code == 400){
      wx.showToast({
        title:'手机号错误',
        icon:'none'
      })
    }else if(result.code == 502){
      wx.showToast({
        title:'密码错误',
        icon:'none'
      })
    }else{
      wx.showToast({
        title:'登陆失败，请重新登陆',
        icon:'none'
      })
    }

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