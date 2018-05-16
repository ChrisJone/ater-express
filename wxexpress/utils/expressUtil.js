/**
 * 快递工具类
 */

/**
 * 查询的历史缓存数据
 */
function expDataHanlder(cacheExpData,inData){
    var expNo = inData.LogisticCode;
    var shipperCode = inData.ShipperCode;
    var key = shipperCode+"_"+expNo;
    var expList = inData.
}