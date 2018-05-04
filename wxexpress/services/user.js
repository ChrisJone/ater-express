const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo')) {

      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}

function loginByWeixin(){
  let code = null;
  return new Promise(function(resolve,reject){
    return util.login().then((res)=>{
      code = res.code;
      return util.getUserInfo();
    }).then((userInfo)=>{
      util.request(api.AuthLoginByWeixin,{code:code,userInfo:userInfo.userInfo},'POST').then(res =>{
        let code = res.meta.code;
        if (code === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
        reject(err);
      })
  });
}

module.exports = {
  checkLogin: checkLogin,
  loginByWeixin: loginByWeixin
}