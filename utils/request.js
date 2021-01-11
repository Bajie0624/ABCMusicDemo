// 封装功能函数
import config from './config'
export default (url,data={},method='GET')=>{
  return new Promise((resolve,reject) =>{
    wx.request({
      // url:config.mobileHost + url,
      url:config.host + url,
      data,
      method,
      success:(res) => {
        //修改promise为成功装填
        resolve(res.data)
      },
      fail:(err) => {
        //修改为失败状态
        reject(err)
      }
    })
  })
}
