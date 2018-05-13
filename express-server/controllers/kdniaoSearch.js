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

        return res.tools.setJson(0,'处理成功',{
            data:kdniao.getOrderTracesByJson("","3924730222455")
        })

    }

}

export default Ctrl