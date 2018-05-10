const util = require('../utils/util');
const api = require('../config/api');

//快递鸟查询

function searchByExpNo(expNo){
    return new Promise(function(resolve,reject){
        util.request(api.kdniaoSearch.ExpressSearchUrl,{expNo:expNo,orderNo:''},
        'POST').then((res) =>{
            let code = res.meta.code;
            if(code === 0){
                console.log(code);
            }else{
                console.log(res);
            }
        })
    });
}

module.exports = {
    searchByExpNo : searchByExpNo,
}