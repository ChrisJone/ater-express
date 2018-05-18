const kdniao = require('../expresslib/kdniao/kdniao');

class Ctrl{
    constructor(app){
        Object.assign(this,{
            app,
        });
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.routes();
    }

    routes(){
        this.app.post('/api/kdniaoSearch/getOrderTracesByJson', this.getOrderTracesByJson.bind(this));
    }

    getOrderTracesByJson(req,res,next){
        let orderNo = req.body.orderNo;
        let expNo = req.body.expNo;
        console.log('expNo-->'+expNo);
        if(!expNo){
            return res.tools.setJson(1,'请输入快递单号',{});
        }

        orderNo = orderNo | null;

        console.log('orderNo'+orderNo);
        var _data = null;
        kdniao.getOrderTracesByJson("","1111111111111").then(doc=>{
            _data = doc;
            return res.tools.setJson(0,'处理成功',{
                expressData:_data
            })
        }).catch(err=>{
            return res.tools.setJson(1,'处理失败',{
                errMsg:err
            })
        });
    }

}

export default Ctrl