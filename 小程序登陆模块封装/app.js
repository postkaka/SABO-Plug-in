// app.js
App({
  onLaunch: function () {
    
    //获取胶囊按钮信息
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    //获取机器信息
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        console.log(this.globalData.navHeight+'+'+this.globalData.navTop+'+'+this.globalData.windowHeight);
      },
      fail(err) {
        console.log(err);
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code+'我是登录中的')
        if(res.code){
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'+res.code,
            // url: 'http://192.168.2.103:5001/v1/session-key/'+res.code,
            success (res) {
              console.log(res);
              console.log(res.data.data.session_key);
              wx.setStorageSync("sessionkey", res.data.data.session_key);
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              console.log(this);
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    flag:false,
    navHeight:null,
    navTop:null,
    windowHeight:null,
    stastic:1
  },
  
})
