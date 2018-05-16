const server_url = 'http://api.kdniao.cc/';
const dev_server_url = 'http://sandboxapi.kdniao.cc:8080/kdniaosandbox/gateway/';
var kdniaoApi =  {
    //电商ID test1335594
    e_business_id:'1335594',
    //电商加密私钥，快递鸟提供，注意保管 b5d7acac-607d-4665-a5fd-305aa2af6aee
    app_key : '4567c87b-2af9-415c-95de-b61eca8773fc',
    //业务类型API
    post_module:{
        //即时查询API
        ebusinessOrderHandler:{
            url : server_url + 'Ebusiness/EbusinessOrderHandle.aspx',
            dev_url : dev_server_url + 'exterfaceInvoke.json',
            searchType:{
                //即时查询物流
                immediate_search : '1002',
                //单号识别
                order_verify:'2002',
            }
        },

    }
}

module.exports = kdniaoApi;



