var api = require('/config/api.js');
var util = require('/utils/util.js');
var user = require('/services/user.js');
//app.js
App({
  onLaunch: function () {
  
    //获取用户的登录信息
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {

    });
    //获取查询历史快递
    this.globalData.searchExpData = wx.getStorageInfoSync('searchExpData');
  },
  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
    searchExpData: {},
  }
})