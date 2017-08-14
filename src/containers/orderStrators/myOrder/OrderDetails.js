import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Tabs  } from 'antd';
import { connect } from 'react-redux';
import * as breadActions from '../../../actions/breadActions';
const TabPane = Tabs.TabPane;


class OrderDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            dataSource1:[]
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '订单管理','订单详情']));
    }
    initDataSource(){
        /***
         fetch(PATH + '',{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: 'no-cors',
                body: ''
            }).then( (response) => response.json() ).then( (data) => {
                // if(data.code) ...
            }).catch( (error) => {
                console.error(error);
            }).done();
         ***/
        let dataSource1=[{
            key:'01',
            goodsNo:'123456',
            goodsName:'可口可乐',
            brand:'可口可乐',
            norms:'100ml*24',
            units:'箱',
            sku:'草莓味',
            num:20,
            shelf:'3#货架',
            salver:'6#货位',
        }];
        return dataSource1;
    }
    build(){
        let dataSource1=this.initDataSource();
        this.setState({dataSource1});
    }
    render(){
        return(
            <div>
                <Row>
                    <Col span={24} className="text-right">
                        <Button onClick={this.build.bind(this)} type="primary">生成拣货单</Button>
                    </Col>
                </Row>
                <Essential/>
                <GoodsList dataSource1={this.state.dataSource1}/>
                <div className="text-right mt-10">
                    <Button className="mr-10" onClick={()=> this.props.history.go(-1)}>返回</Button>
                    <Button type="primary">打印拣货单</Button>
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
                         <p> <label>订单编号 : </label><span>456454564234</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>下单时间 : </label><span>2017-07-31 12:00:00</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>支付方式 : </label><span>货到付款</span> </p>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <p> <label>下单客户 : </label><span>测试客户</span> </p>
                    </Col>
                    <Col span={8}>
                       <p> <label>详细地址 : </label><span>中原区秦岭路国家大学科技园</span> </p>
                    </Col>
                    <Col span={8}>
                        <p> <label>订单备注 : </label><span>子非鱼，安知鱼之乐</span> </p>
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
            dataSource1:[],
             dataSource2:[{
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
        this.columns1 = [{
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
            key:'num'
        },{
            title: '货架',
            dataIndex: 'shelf',
            key:'shelf'
        },{
            title: '货位',
            dataIndex: 'salver',
            key:'salver'
        }];
        this.columns2 = [{
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
            key:'num'
        },{
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
    }
    render(){
        return(
            <div style={styles.goodsList}>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="拣货单" key="1">
                        <div  style={styles.goodsTable}>
                            <Table 
                                pagination={false} 
                                dataSource={this.props.dataSource1}
                                columns={this.columns1} 
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="发货单" key="2">
                        <div  style={styles.goodsTable}>
                            <Table 
                                pagination={false} 
                                dataSource={this.state.dataSource2} 
                                columns={this.columns2} 
                            />
                            <div style={styles.footerList}>
                                <Row>
                                    <Col span={4}>
                                        <p> <label>订单状态 : </label><span>待发货</span> </p>
                                    </Col>
                                    <Col span={4}>
                                        <p> <label>商品件数 : </label><span>20</span> </p>
                                    </Col>
                                    <Col span={4}>
                                        <p> <label>总数量 : </label><span>50</span> </p>
                                    </Col>
                                    <Col span={4}>
                                        <p> <label>总金额 : </label>￥<span>1000</span> </p>
                                    </Col>
                                    <Col span={4}>
                                        <p> <label>使用余额 : </label>￥<span>0</span> </p>
                                    </Col>
                                    <Col span={4}>
                                        <p> <label>应付金额 : </label>￥<span>1000</span> </p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const styles = {
    conatiern:{
        color:'#333',
        fontSize:14
    },
    goodsList:{
        marginTop:30,
        borderWidth:1,
        borderColor:'#dfdfdd',
        borderStyle:'solid',
        borderRadius:5
    },
    goodsTable:{
        marginTop:-16
    },
    footerList:{
        padding:10,
        background:'#f4f8fa'
    }
}

function mapStateToProps(state){
    return state = {

    }
}

export default connect(mapStateToProps)(OrderDetails);