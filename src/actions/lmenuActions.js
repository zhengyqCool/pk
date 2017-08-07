import * as cont from '../config/constant'

export function getLmenus(dispatch) {
    return function (dispatch) {
        let menus = [
            { id: 1, title: '仓库管理', icon: 'home', url: '', target: '_blank', lft: 1, rgt: 4, pid: 0 },
                { id: 2, title: '我的仓库', icon: '', url: '/warehouseManagement/MyWarehouse', target: 'lash', lft: 2, rgt: 3, pid: 0 },
            { id: 3, title: '仓内操作', icon: 'appstore', url: '', target: '_blank', lft: 5, rgt: 12, pid: 0 },
                // { id: 4, title: '销售手动补货', icon: '', url: '/warehouseLayout/PalletReplenishment', target: 'lash', lft: 6, rgt: 7, pid: 0 },
                // { id: 5, title: '销售自动补货', icon: '', url: '/warehouseLayout/AutoPalletReplenishment', target: 'lash', lft: 8, rgt: 9, pid: 0 },
                { id: 4, title: '补货列表', icon: '', url: '/warehouseLayout/ReplenishmentList', target: 'lash', lft: 8, rgt: 9, pid: 0 },
                { id: 6, title: '商品入库', icon: '', url: '/warehouseLayout/GoodsWarehousing', target: 'lash', lft: 10, rgt: 11, pid: 0 },
            { id: 7, title: '订单管理', icon: 'solution', url: '', target: '_blank', lft: 13, rgt: 19, pid: 0 },
                { id: 8, title: '我的订单', icon: '', url: '/orderStrators/myOrder/MyOrder', target: 'lash', lft: 14, rgt: 15, pid: 0 },
                // { id: 9, title: '订单统计', icon: '', url: '/orderStrators/orderStatistics', target: 'lash', lft: 16, rgt: 17, pid: 0 },
                // { id: 10, title: '商品统计', icon: '', url: '', target: 'lash', lft: 17, rgt: 18, pid: 0 },        
            { id: 11, title: '商品管理', icon: 'gift', url: '', target: '_blank', lft: 20, rgt: 23, pid: 0 },
                { id: 12, title: '商品上架', icon: '', url: '/goodsAdministrate/GoodsSale', target: 'lash', lft: 21, rgt: 22, pid: 0 },
            { id: 13, title: '库存管理', icon: 'pie-chart', url: '', target: '_blank', lft: 24, rgt: 29, pid: 0 },
                { id: 14, title: '库存查询', icon: '', url: '/InventoryManagement/InventoryInquiry', target: 'lash', lft: 25, rgt: 26, pid: 0 },
                { id: 15, title: '库存盘点', icon: '', url: '/InventoryManagement/StockTaking', target: 'lash', lft: 27, rgt: 28, pid: 0 },
            { id: 16, title: '出库管理', icon: 'to-top', url: '', target: '_blank', lft: 30, rgt: 33, pid: 0 },
                { id: 17, title: '商品出库', icon: '', url: '/stockRemovalStrator/StockRemoval', target: 'lash', lft: 31, rgt: 32, pid: 0 },
            { id: 18, title: 'menu2', icon: '', url: '', target: '_blank', lft: 40, rgt: 47, pid: 0 },
                { id: 19, title: 'menu21', icon: '', url: '/approvalDefines', target: 'lash', lft: 41, rgt: 42, pid: 0 },
                { id: 20, title: 'menu221', icon: '', url: '/approvalDefine', target: 'lash', lft: 43, rgt: 44, pid: 0 },
           
           
        ];
        // console.log('start to get left menus..............')
        dispatch(getLmenusSuccess(menus));
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {

            }).catch((err) => {
            });
    }
}

function getLmenusSuccess(menus) {
    let nmenus = [];
    let submenu = null;
    menus.forEach(function (mn) {
        // console.log('foreach menus :::'+JSON.stringify(mn))
        if (mn == null) {
            return;
        }
        if (mn.rgt - mn.lft > 1) {
            submenu = null;
            submenu = {};
            submenu.menuitems = [];
            submenu.menu = mn;
            nmenus.push(submenu);
        } else {
            if (submenu == null) {
                return;
            } else {
                submenu.menuitems.push(mn);
            }
        }
    }, this);
    //  console.log('left menus :::::::::'+JSON.stringify(nmenus))
    return ({
        type: 'get_left_menu',
        payload: {
            menus: nmenus,
        }
    });
}