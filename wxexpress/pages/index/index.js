//index.js
//获取应用实例
const app = getApp();
const kdniaoExpData= require('../../data/kdniaoexpress');
const kdniao = require('../../services/kdniao');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    expData:kdniaoExpData.expressData
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scan:function(e){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    });
  },
  /**
   * 查询快递
   */
  searchExp:function(e){
     var expNo = e.detail.value;//用户输入的快递单号
      kdniao.searchByExpNo("32423424234");
  },
  selectExpress:function(e){
    var index = e.detail.value;
    console.log(this.data.expData[index].key);
  }
})
