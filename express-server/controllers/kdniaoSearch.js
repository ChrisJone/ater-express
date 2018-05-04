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
        const orderNo = req.orderNo;
        const expNo = req.expNo;

        console.log('orderNo'+orderNo);

        return res.tools.setJson('0','处理成功',{
            data:kdniao.getOrderTracesByJson(orderNo,expNo)
        })

    }

}

export default Ctrl