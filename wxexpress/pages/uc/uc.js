// pages/uc/uc.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var userApi = require('../../services/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{

    },
    canIUse:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    var that = this;
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          userApi.loginByWeixin().then(res=>{
            that.setData({
              userInfo:res.data.userInfo,
              canIUse : false,
            });
          });
        }  
      }  
    })    
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
  
  },

  bindGetUserInfo : function (e){
    userApi.loginByWeixin().then(res=>{
      this.setData({
        userInfo:res.data.userInfo,
        canIUse : false,
      });
    });
  }
})