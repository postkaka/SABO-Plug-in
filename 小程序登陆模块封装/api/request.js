
var serverUrl = "";
// 例外不用token的地址
var exceptionAddrArr = [];
// 获取sessionKey
const getSessionKey = ()=> {return  new Promise((resolve, reject) => {
  let sessionKey = wx.getStorageSync("sessionkey");
  wx.checkSession({
    success () {
      resolve(sessionKey);
    },
    fail () {
      // 登录
      wx.login({
        success: res => {
          if(res.code){
            // return this.httpFake('session-key','get',{},sessionKeyCallback);
            // function sessionKeyCallback(e){
              wx.setStorageSync("sessionKey", e.sessionKey);
            // }
          }
          reject(res);
        }
      })
    }
  })
      
})}

//post请求，数据在body中
async function httpRequest(url, data, method = "GET") {
  var header = {};
  var result;
  var e = await getSessionKey()
    if (e) {
      let encryptedData = wx.getStorageSync('encryptedData');
      let iv = wx.getStorageSync('iv');
      // header.Authorization = token;
      header['encryptedData'] = encryptedData;
      header['iv'] = iv;
      header['sessionKey'] = e;
      // if(method == "post-form"){
      // header['Content-Type'] =  "application/text";
      // }
    }
  return  new Promise((resolve, reject) => {
    if (e) {
      wx.request({
        url: serverUrl + url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          resolve(res)
          // if (res.statusCode === 200) {
          //   //200: 服务端业务处理正常结束
          //   resolve(res)
          // } else {
          //   reject(res)
          // }
        }),
        fail: (res => {
          reject(res)
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/index',
      })
      wx.showToast({
        title: '登录失效,请重新登录！',
        icon: 'none',
        duration: 2000
      })
    }
  })
}

module.exports.httpRequest = httpRequest;
