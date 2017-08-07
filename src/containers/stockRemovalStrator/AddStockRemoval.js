import React, { Component } from 'react';
import {Table, Button, Row, Col,Checkbox,AutoComplete} from 'antd';
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
}
 
class AddStockRemoval extends Component {
   constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '出库管理','商品出库','拣货单出库']));
    }

    render(){
        let jhdData = ['1231231','2342342','346547567','87978909678']
        return(
            <div>
                <div style={styles.headerCss}>
                    <Row>
                        <Col span={12}>
                            <AutoComplete
                                style={{ width: 200 }}
                                dataSource={jhdData}
                                placeholder="请输入拣货单号"
                                allowClear={true}
                                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            />
                        </Col>
                        <Col span={12} className="text-right">
                            <Button onClick={()=>{this.props.history.go(-1)}} type="primary">返回</Button>
                        </Col>
                    </Row>
                </div>
                <div className="text-center mb-20">
                    <h2 style={styles.title}>配客商贸发货单</h2>
                </div>
                <Essential/>
                <GoodsList/>
                <div className="text-right mt-10">
                    <Checkbox style={{color:'#585858'}} defaultChecked={true} onChange={(e)=>console.log(e.target.checked)}>并打印发货单</Checkbox>
                    <Button className="ml-10" type="primary">确认出库</Button>
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
                <Table 
                    pagination={false} 
                    dataSource={this.state.dataSource} 
                    columns={this.columns} 
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
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(AddStockRemoval);