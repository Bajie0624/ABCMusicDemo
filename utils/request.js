// 封装功能函数
import config from './config'
export default (url,data={},method='GET')=>{
  return new Promise((resolve,reject) =>{
    wx.request({
      // url:config.mobileHost + url,
      url:config.host + url,
      data,
      method,
      header:{
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success:(res) => {
        //修改promise为成功装填
        if (data.isLogin) {
          // 将用户cookia存入到本地
          wx.setStorage({
            data: res.cookies,
            key: 'cookies',
          })
        }
        resolve(res.data)
      },
      fail:(err) => {
        //修改为失败状态
        reject(err)
      }
    })
  })
}
