function sentRes(url,data,method,fn){
    data=data||null;
    if(data==null){
        var content=require('querystring').stringify(data);
    }else{
        var content = JSON.stringify(data); //json format
    }

    var parse_u=require('url').parse(url,true);
    var isHttp=parse_u.protocol=='http:';
    var options={
        //host:url,
        host:parse_u.hostname,
        port:parse_u.port||(isHttp?80:443),
        path:parse_u.path,
        method:method,
        headers:{
            'Content-Type':'application/json',
            'Trackingmore-Api-Key':'53c27d42-45ca-4466-b3f2-861eb555adf1'
        }
    };
    //console.log(options);
    var req = require(isHttp?'http':'https').request(options,function(res){
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;
        });
        res.on('end', function(){
            fn!=undefined && fn(_data);
        });
    });
    req.write(content);
    req.end();
}



//post
// var postData ={"tracking_number": "BYS006086075","carrier_code":"yanwen"};
// var url ='http://api.trackingmore.com/v2/trackings/post';
// sentRes(url,postData,"POST",function(data){
// console.log(data);
// });

//get
// var postData =null;
// var url ='http://api.trackingmore.com/v2/trackings/get?page=1&limit=25&created_at_min=1441314361&created_at_max=1477460736';
// sentRes(url,postData,"GET",function(data){
// console.log(data);
// });

//batch
// var postData =[{"tracking_number": "BYS006086092","carrier_code":"yanwen"},{"tracking_number": "BYS006086089","carrier_code":"yanwen"}];
// var url ='http://api.trackingmore.com/v2/trackings/batch';
// sentRes(url,postData,"POST",function(data){
// console.log(data);
// });

//codeNumberGet
var postData =null;
var url ='http://api.trackingmore.com/v2/trackings/yanwen/BYS006086075';
sentRes(url,postData,"GET",function(data){
console.log(data);
});


//codeNumberPut
// var postData ={"title": "nodejstest","customer_name":"test","customer_email":"abc@qq.com","order_id":"#123456"};
// var url ='http://api.trackingmore.com/v2/trackings/yanwen/BYS006086075';
// sentRes(url,postData,"PUT",function(data){
// console.log(data);
// });

//codeNumberDel
// var postData =null;
// var url ='http://api.trackingmore.com/v2/trackings/yanwen/BYS006086061';
// sentRes(url,postData,"DELETE",function(data){
// console.log(data);
// });


//realtime
// var postData ={"tracking_number": "BYS006086089","carrier_code":"yanwen","title": "nodejstest","customer_name":"test","customer_email":"abc@qq.com","order_id":"#123456"};
// var url ='http://api.trackingmore.com/v2/trackings/realtime';
// sentRes(url,postData,"POST",function(data){
// console.log(data);
// });

