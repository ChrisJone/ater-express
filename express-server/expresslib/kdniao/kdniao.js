var kdniaoApi = require('./kdniaoApi');
import crypto from "crypto";
var querystring = require('querystring');

var jwt = require('../../common/jwtauth');

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
            'Content-Type':'application/x-www-form-urlencoded'
        }
    };


    var req = require(isHttp?'http':'https').request(option,function (res) {
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;
        });
        res.on('end', function(){
            fn!=undefined && fn(_data);
        });
    });
    req.end();
};

/**
 * 即时查询物流状态
 * @param expCode 订单号
 * @param expNo 物流单号
 */
function getOrderTracesByJson(expCode,expNo) {

    var requestData={'OrderCode':'','ShipperCode':expCode,'LogisticCode': expNo};
    var requestEncodeData = encodeURI(requestData);
    var md5value = crypto.createHash('md5').update(requestData + kdniaoApi.app_key).digest('hex');
    var DataSign = encodeURI(new Buffer((md5value),'base64'));

    var _post_data = {
        'RequestData':requestEncodeData,
        'EBusinessID': kdniaoApi.e_business_id,
        'RequestType':kdniaoApi.post_module.ebusinessOrderHandler.code,
        'DataSign':DataSign,
        'DataType':'2' //json格式
    };
    sendRequest(kdniaoApi.post_module.ebusinessOrderHandler.url,_post_data,'POST',function (data) {
        console.log(data);
        return data;
    })
}

module.exports={
    getOrderTracesByJson:getOrderTracesByJson,
};