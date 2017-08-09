import React, { Component } from 'react';
import '../css/App.css';

import LoginMenu from '../menus/LoginMenu';
import LeftMenu from '../menus/LeftMenu';
import { connect } from 'react-redux';
import CustomBread from '../Bread/CustomBread'
import logo from '../imgs/logo.png';
import {Layout,Badge,Icon} from 'antd'
import {
    // BrowserRouter as Router,
    // HashRouter as Router,
    Route,
    withRouter,
} from 'react-router-dom';
const { Header, Content, Sider } = Layout;

import ApprovalDefines from './approval/approvalDefines';
import ApprovalDefine from './approval/approvalDefine';
import ShelfList from './warehouseManagement/sheflManagement/ShelfList';
import SalverList from './warehouseManagement/sheflManagement/salverManangement/SalverList';
import LookShelf from './warehouseManagement/sheflManagement/editShelf/LookShelf';
import AddShelf from './warehouseManagement/sheflManagement/AddShelf';
// import ShelfModification from './warehouseLayout/ShelfModification';

import PalletReplenishment from './warehouseLayout/PalletReplenishment';
import ReplenishmentList from './warehouseLayout/ReplenishmentList';
import AddAutoReplenishment from './warehouseLayout/AddAutoReplenishment';
import AddPalletReplenishment from './warehouseLayout/AddPalletReplenishment';

import MyWarehouse from './warehouseManagement/MyWarehouse';
import AddWarehouse from './warehouseManagement/AddWarehouse';
import GoodsWarehousing from './warehouseLayout/GoodsWarehousing';
import AddGoodsWarehousing from './warehouseLayout/AddGoodsWarehousing';

import inventoryInquiry from './InventoryManagement/InventoryInquiry';
import stockTaking from './InventoryManagement/StockTaking';
import addStockTaking from './InventoryManagement/AddStockTaking';
import ContinueTaking from './InventoryManagement/ContinueTaking';
// orderStrators
import MyOrder from './orderStrators/myOrder/MyOrder';
import OrderDetails from './orderStrators/myOrder/OrderDetails';


import GoodsSale from './goodsAdministrate/GoodsSale';
import orderStatistics from './orderStrators/orderStatistics';

import StockRemoval from './stockRemovalStrator/StockRemoval';
import AddStockRemoval from './stockRemovalStrator/AddStockRemoval';
import ManualStockRemoval from './stockRemovalStrator/ManualStockRemoval';


class App extends Component { 
    handleDisabledChange = (disabled) => {
        this.setState({ disabled });
    }
    render() {
        return (
            <Layout className="App">
                <Header className='App-header' >
                    <div className="logo-box">
                        <div style={{ paddingTop: 10, width: 40, float: 'left' }}>
                            <img src={logo} />
                        </div>
                        <span className="lg-text">配客商贸管理系统</span>
                    </div>
                    <div className="lgmenu-Box">
                        <LoginMenu style={{ color: '#fff' }} />
                    </div>
                    <div className="bdg-Box">
                        <Badge count={5}>
                            <a href="#" className="head-example" ><Icon type="notification" style={{ fontSize: 26, color: '#fff' }} /></a>
                        </Badge>
                    </div>
                </Header>
                <Layout>
                    <Sider className="ly-sider">
                        <LeftMenu  />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <CustomBread />
                        <Content className='App-content'>
                            <Route path='/warehouseManagement/AddWarehouse/:wId' component={AddWarehouse} />
                            <Route path='/warehouseManagement/MyWarehouse' component={MyWarehouse} />
                            <Route path='/warehouseManagement/sheflManagement/ShelfList/:ckid' component={ShelfList} /> 
                            <Route path='/warehouseManagement/sheflManagement/salverManangement/SalverList/:sId' component={SalverList} /> 
                            <Route path='/warehouseManagement/sheflManagement/editShelf/LookShelf/:sId' component={LookShelf} /> 
                             <Route path ='/warehouseManagement/sheflManagement/AddShelf/:sId' component={AddShelf}/> 
                            {/* <Route path ='/warehouseLayout/ShelfModification/:adid' component={ShelfModification}/> */}
                            <Route path='/warehouseLayout/GoodsWarehousing' component={GoodsWarehousing} />
                            <Route path='/warehouseLayout/AddGoodsWarehousing/:adid' component={AddGoodsWarehousing} />
                            
                            <Route path='/warehouseLayout/PalletReplenishment' component={PalletReplenishment} />
                            <Route path='/warehouseLayout/ReplenishmentList' component={ReplenishmentList} />
                            <Route path='/warehouseLayout/AddPalletReplenishment/:adid' component={AddPalletReplenishment} />
                            <Route path='/warehouseLayout/AddAutoReplenishment' component={AddAutoReplenishment} />
                            <Route path='/orderStrators/orderStatistics' component={orderStatistics} />
                            
                            <Route exact path='/orderStrators/myOrder/MyOrder' component={MyOrder} />
                            <Route exact path='/orderStrators/myOrder/OrderDetails' component={OrderDetails} />
                            
                            <Route path='/goodsAdministrate/GoodsSale' component={GoodsSale} />
                            <Route path='/approvalDefines' component={ApprovalDefines} />
                            
                            <Route path='/InventoryManagement/InventoryInquiry' component={inventoryInquiry} />
                            <Route path='/InventoryManagement/StockTaking' component={stockTaking} />
                            <Route path='/InventoryManagement/AddStockTaking' component={addStockTaking} />
                            <Route path='/InventoryManagement/ContinueTaking' component={ContinueTaking} />
                            
                            <Route path='/stockRemovalStrator/StockRemoval' component={StockRemoval} />
                            <Route path='/stockRemovalStrator/AddStockRemoval' component={AddStockRemoval} />
                            <Route path='/stockRemovalStrator/ManualStockRemoval' component={ManualStockRemoval} />
                            <Route path='/approvalDefine/:adid' component={ApprovalDefine} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
function mapStateToProps(state) {
    return {
    }
}

export default withRouter(connect(mapStateToProps)(App));

