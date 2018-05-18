var kdniaoApi = require('./kdniaoApi');
import crypto from "crypto";
var querystring = require('querystring');

function sendRequest(url,data,method,fn) {
    data = data || null;
    var content = querystring.stringify(data);

    console.log('请求参数-->'+content);
    var parse_url = (require('url')).parse(url,true);
    var isHttp = parse_url.protocol == 'http:';
    var option={
        host:parse_url.hostname,
        port:parse_url.port||(isHttp?80:443),
        path:parse_url.path+"?"+content,
        method:method,
        headers:{
            'accept':'*/*',
            'connection':'Keep-Alive',
            'user-agent':'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)',
            'content-Type':'application/x-www-form-urlencoded'
        }
    };


    var req = require(isHttp?'http':'https').request(option,function (res) {
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;
        });
        res.on('error',function (chunk) {
            _data += chunk;
        });
        res.on('end', function(){
            fn!=undefined && fn(_data);
        });
    });
    req.end();
};


function postRequestData(data,requestType){
    let requestEncodeData = encodeUriQuery(data,'utf8');
    let md5value = md5(data + kdniaoApi.app_key,'utf8');
    let base64Value = Buffer.from(md5value);
    let dataSign = encodeUriQuery(base64Value.toString('base64'),'utf8');

    let _post_data = {
        'RequestData':requestEncodeData,
        'EBusinessID': kdniaoApi.e_business_id,
        'RequestType':requestType,
        'DataSign':dataSign,
        'DataType':'2' //json格式
    };
    return _post_data;
}

/**
 * 即时查询物流状态
 * @param expCode 订单号
 * @param expNo 物流单号
 */
function getOrderTracesByJson(expCode,expNo) {

    return new Promise(function (resolve,reject){
        return expNoVerify('2343242342323').then(res =>{
            let shipperCode = res;
            if(!shipperCode){
                return null;
            }

            let requestData="{'OrderCode':'','ShipperCode':'"+shipperCode+"','LogisticCode': '"+expNo+"'}";

            let _post_data = postRequestData(requestData,kdniaoApi.post_module.ebusinessOrderHandler.searchType.immediate_search);
            sendRequest(kdniaoApi.post_module.ebusinessOrderHandler.url,_post_data,'POST',function (data) {
                console.log('查询单号验证>>>>>>'+data);
                resolve(data);
            });
        }).catch(err=>{
            console.log('error enpNoVerify>>>>'+err.Reason);
            reject("输入有误,请重新输入");
        })
    });
}

/**
 * 单号识别物流公司
 * 返回可能会有多家，排名靠前的命中率更高
 * @param expNo
 */
function expNoVerify(expNo) {
    return new Promise(function (resolve, reject) {
        let requestData = "{'LogisticCode':'" + expNo + "'}";

        let _post_data = postRequestData(requestData, kdniaoApi.post_module.ebusinessOrderHandler.searchType.order_verify);


        sendRequest(kdniaoApi.post_module.ebusinessOrderHandler.url, _post_data, 'POST', function (data) {
            var _retData = JSON.parse(data);
            var _data = null;
            if (_retData.Success == true) {
                var verList = _retData.Shippers;
                if (verList.length > 0) {
                    _data = verList[0].ShipperCode;
                    resolve(_data);
                } else {
                    reject(_retData);
                }
            } else {
                reject(_retData);
            }

        })
    });
}


    /**
     * 编码URI
     * @param  {String} value
     * @param  {String} pctEncodeSpaces
     * @return {String}
     */
    function encodeUriQuery(value, pctEncodeSpaces) {
        return encodeURIComponent(value)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            .replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'))
    }

    function md5(value,encode){
        let md5Value = crypto.createHash("md5");
        md5Value.update(value,encode);
        return md5Value.digest('hex');
    }


module.exports={
    getOrderTracesByJson:getOrderTracesByJson,
    expNoVerify:expNoVerify,
};