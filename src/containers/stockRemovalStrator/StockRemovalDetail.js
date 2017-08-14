import React, { Component } from 'react';
import {Table, Button, Row, Col,Checkbox,AutoComplete,InputNumber,Input} from 'antd';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';

const styles = {
    conatiern:{
        color:'#333',
        fontSize:14
    },
    title:{
        fontWeight:'normal'
    },
    goodsList:{
        marginTop:30,
        borderWidth:1,
        borderColor:'#dfdfdd',
        borderStyle:'solid',
        borderRadius:5
    },
    footerList:{
        padding:10,
        background:'#f4f8fa',
        color:'#333'
    },
    headerCss:{
        paddingBottom:10,
        marginBottom:10,
        borderWidth:0,
        borderBottomWidth:1,
        borderColor:'#dfdfdd',
        borderStyle:'solid'
    }
};
class StockRemovalDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            Data:{}
        }
    }
    initDataSource(){
        /***
         fetch("",{
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: 'no-cors',
                body: ''
            }).then( (response) => response.json() ).then( (data) => {
                // if(data.code) ...
                console.log(data)
            }).catch( (error) => {
                console.error(error);
            }).done();
         ***/
        let STObj={OrderNo:344567,OrderTime:"2017-07-31 12:00:00",OrderPayStyle:"货到付款",OrderName:"谢知非",OrderAddress:"中原区秦岭路国家大学科技园",OrderPS:"子非鱼，安知鱼之乐",OrderList:[{key:'01', goodsNo:'123456', goodsName:'可口可乐', brand:'可口可乐',norms:'100ml*24', units:'箱', sku:'草莓味', num:20, price:20.00, subtotal:400.00,},{key:'02', goodsNo:'9527', goodsName:'辣条', brand:'可口可乐', norms:'100ml*24', units:'箱', sku:'草莓味', num:10, price:10.00, subtotal:100.00,}],OrderType:"待发货",goodsNumber:2,totalNumber:30,OrderPay:500.00,ShouldPay:500.00,UsePay:0};
        return STObj;
    }
    componentDidMount() {
        let Data=this.initDataSource();
        this.setState({Data});
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '出库管理','商品出库','商品详情']));
    }
    Back(){
        history.back();
    }
    render(){
        return(
            <div>
                <div className="text-center mb-20">
                    <h2 style={styles.title}>配客商贸发货单</h2>
                </div>
                <Essential Data={this.state.Data}/>
                <GoodsList Data={this.state.Data}/>
                <div className="text-right mt-10">
                    <Button className="ml-10" type="primary" onClick={this.Back}>返回</Button>
                </div>
            </div>
        )
    }
}

class Essential extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
            <div style={styles.conatiern}>
                <Row style={{marginBottom:10}}>
                    <Col span={8}>
                        <p> <label>订单编号 : </label><span>{this.props.Data.OrderNo}</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>下单时间 : </label><span>{this.props.Data.OrderTime}</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>支付方式 : </label><span>{this.props.Data.OrderPayStyle}</span> </p>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <p> <label>下单客户 : </label><span>{this.props.Data.OrderName}</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>详细地址 : </label><span>{this.props.Data.OrderAddress}</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>订单备注 : </label><span>{this.props.Data.OrderPS}</span> </p>
                    </Col>
                </Row>
            </div>
        )
    }
}

class GoodsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource:[{
                key:'01',
                goodsNo:'123456',
                goodsName:'可口可乐',
                brand:'可口可乐',
                norms:'100ml*24',
                units:'箱',
                sku:'草莓味',
                num:20,
                price:20.00,
                subtotal:400.00,
            },{
                key:'02',
                goodsNo:'123456',
                goodsName:'可口可乐',
                brand:'可口可乐',
                norms:'100ml*24',
                units:'箱',
                sku:'草莓味',
                num:20,
                price:20.00,
                subtotal:400.00,
            }]
        }
        this.columns = [{
            title: '商品编码',
            dataIndex: 'goodsNo',
            key: 'goodsNo',
        }, {
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
        }, {
            title: '品牌',
            dataIndex: 'brand',
            key: 'brand',
        },{
            title: '规格',
            dataIndex: 'norms',
            key: 'norms',
        },{
            title: '单位',
            dataIndex: 'units',
            key: 'units',
        },{
            title: '特征值',
            dataIndex: 'sku',
            key: 'sku',
        },{
            title: '数量',
            dataIndex: 'num',
            key:'num',
        }
            ,{
                title: '价格',
                dataIndex: 'price',
                key:'price'
            },{
                title: '小计（元）',
                dataIndex: 'subtotal',
                key:'subtotal'
            }];
    }
    callback = (key)=> {
        console.log(key)
    };
    StNumberChange(record,index,value){
        this.props.FetchData(record,index,value);
    }
    render(){
        return(
            <div style={styles.goodsList}>
                <Table
                    pagination={false}
                    dataSource={this.props.Data.OrderList}
                    columns={this.columns}
                />
                <div style={styles.footerList}>
                    <Row>
                        <Col span={4}>
                            <p> <label>订单状态 : </label><span>{this.props.Data.OrderType}</span> </p>
                        </Col>
                        <Col span={4}>
                            <p> <label>商品件数 : </label><span>{this.props.Data.goodsNumber}</span> </p>
                        </Col>
                        <Col span={4}>
                            <p> <label>总数量 : </label><span>{this.props.Data.totalNumber}</span> </p>
                        </Col>
                        <Col span={4}>
                            <p> <label>总金额 : </label>￥<span>{this.props.Data.OrderPay}</span> </p>
                        </Col>
                        <Col span={4}>
                            <p> <label>使用余额 : </label>￥<span>{this.props.Data.UsePay}</span> </p>
                        </Col>
                        <Col span={4}>
                            <p> <label>应付金额 : </label>￥<span>{this.props.Data.ShouldPay}</span> </p>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(StockRemovalDetail);