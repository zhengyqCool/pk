import {combineReducers} from 'redux';
import {loginReducer} from './loginReducer'
import {lmenuReducer} from './leftMenuReducer'
import {approvalReducer} from './approval/approvalReducer'
import {breadReducer} from './breadReducer'
import {ysdSearchReducers ,manualGoodsReducers,selectGoodsReducers} from './warehouseLayout/AddGoodsWarehousingReducers'


const rootReducer = combineReducers({
    login:loginReducer,
    lmenu:lmenuReducer,
    approval:approvalReducer,
    bread:breadReducer,
    autoSelfTable:ysdSearchReducers,
    selfTable:manualGoodsReducers,
    selectGoods:selectGoodsReducers
});
export default rootReducer;