var NewApiRootUrl = 'http://localhost:3000/api/';

module.exports = {
  IndexUrl: NewApiRootUrl + "index/index",//首页
  AuthLoginByWeixin: NewApiRootUrl + 'user/wechat/sign/up', //微信登录


  kdniaoSearch:{
    //查询物流信息
    ExpressSearchUrl: NewApiRootUrl+'kdniaoSearch/getOrderTracesByJson'
  }
};