let basicUrl = '192.168.1.188';
let basicPort = "8018";


export let newwarehouseUrl='/warehouse/newwarehouse.htm'; //新建仓库
export let warehouseListUrl='/warehouse/warehouseList.htm'; //仓库列表
export let delwarehouseUrl =  '/warehouse/delwarehouse.htm'; //删除仓库
export let warehouseinfoUrl =  '/warehouse/warehouseinfo.htm'; //编辑仓库 获取仓库数据
export let updatewarehouseUrl =  '/warehouse/updatewarehouse.htm'; //编辑仓库保存

export let newshelfUrl =  '/warehouse /newshelf.htm';//新建货架
export let updateshelfUrl =  '/warehouse /updateshelf.htm';//编辑货架
export let shelfListUrl =  '/warehouse/shelfList.htm';//货架列表
export let cargospaceUrl =  '/warehouse/cargospace.htm';//查看货位详情

export let updatecargospaceUrl =  '/warehouse/updatecargospace.htm';//编辑货位
export let newcargospaceUrl =  '/warehouse/newcargospace.htm';//新建货位
export let delcargospaceUrl =  '/warehouse/delcargospace.htm';//删除货位

export let shiftgoodsOrderListUrl =  '/repertory/shiftgoodsOrderList.htm';//补货列表finish
export let replenishmentListUrl =  '/repertory/replenishmentList';//手动补货  商品编号找商品
export let doReplenishmentUrl =  '/repertory/doReplenishment.htm';//手动补货单提交
export let autoReplenishmentByImpermanentUrl =  '/repertory/autoReplenishmentByImpermanent.htm';//手动补货单保存
export let finishReplenishmentUrl =  '/repertory/finishReplenishment.htm';//提交并更新库存

export let inRepertoryOrderListUrl =  '/inventory/inRepertoryOrderList.htm';//入库单列表
export let inRepertoryUrl =  '/inventory/inRepertory.htm';//新增手动入库

export let orderListUrl =  '/order/orderList.htm';//订单列表

export const findGoodsListByNameUrl = '/goods/criteria/findGoodsListByName.htm';//根据商品名检索商品
export const findGoodsByTiaomaUrl = '/goods/criteria/findGoodsByTiaoma.htm';//根据国际码查找商品

export function getURL(url) {
    // return 'http://' + basicUrl + ((basicPort === null || basicPort === '') ? '' : (':' + basicPort)) + url;
    return url;
}

export function getPostParams(obj) {
    let param = 'tttid=1';
    for (let key in obj) {
        param = param + '&' + key + '=' + obj[key];
    }
    return param;
}

export function getFormData(obj) {
    let formData = new FormData();
    for (let key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}