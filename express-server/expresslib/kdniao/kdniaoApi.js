const server_url = 'http://api.kdniao.cc/';
var kdniaoApi =  {
    //电商ID
    e_business_id:'1335594',
    //电商加密私钥，快递鸟提供，注意保管
    app_key : '4567c87b-2af9-415c-95de-b61eca8773fc',
    //业务类型API
    post_module:{
        //即时查询API
        ebusinessOrderHandler:{
            url : server_url + 'Ebusiness/EbusinessOrderHandle.aspx',
            code : '1002'
        },

    }
}

module.exports = kdniaoApi;



