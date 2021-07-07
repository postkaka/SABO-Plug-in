import {
    requst_login
  } from '../../api/index.js'
  // 获取应用实例
  const app = getApp()
  
  Page({
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    // 事件处理函数
  //获取手机号
    getPhoneNumber(e) {
      console.log(e);
      if (e.detail.encryptedData) {
        console.log("iv:" + e.detail.iv)
        console.log("encryptedData:" + e.detail.encryptedData)
        wx.setStorageSync('iv', e.detail.iv)
        wx.setStorageSync('encryptedData', e.detail.encryptedData)
        requst_login({
          nickName: this.data.userInfo.nickName,
          avatarUrl: this.data.userInfo.avatarUrl,
          city: this.data.userInfo.city,
          gender: this.data.userInfo.gender,
          province: this.data.userInfo.province,
          language: this.data.userInfo.language,
        }).then((res) => {
          console.log(res.data.data);
          // setTimeout(()=>{
          //   console.log(res);
          // },1000)
          wx.setStorageSync("role", res.data.data);
          wx.navigateTo({
            'url': '/pages/logs/logs'
          });
        }).catch(()=>{
          console.log('登陆失败');
        })
      } else {
        console.log('获取用户手机失败！' + e.errMsg)
      }
    },
  
  
    onLoad() {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
    getUserInfo(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  })

