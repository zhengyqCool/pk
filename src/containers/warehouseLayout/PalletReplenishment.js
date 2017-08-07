import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select } from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

class palletReplenishment extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            dataSource:[
                {
                    key: '1',
                    bhNo: '001',
                    ccw:'1#货架6#位',
                    chw: '3#货架2#位',
                    bhGoods:'补货商品',
                    tzz:'口味',
                    num:'20',
                    bhTime:'2017-07-07 14:00'
                },{
                    key: '2',
                    bhNo: '002',
                    ccw:'2#货架6#位',
                    chw: '3#货架2#位',
                    bhGoods:'补货商品',
                    tzz:'口味',
                    num:'20',
                    bhTime:'2017-07-07 14:00'
                },{
                    key: '3',
                    bhNo: '003',
                    ccw:'3#货架6#位',
                    chw: '3#货架2#位',
                    bhGoods:'补货商品',
                    tzz:'口味',
                    num:'20',
                    bhTime:'2017-07-07 14:00'
                }
            ],
            columns:[
                {
                    title: '补货编号',
                    dataIndex: 'bhNo',
                    key: 'bhNo',
                }, {
                    title: '储存位',
                    dataIndex: 'ccw',
                    key: 'ccw',
                }, {
                    title: '出货位',
                    dataIndex: 'chw',
                    key: 'chw',
                },{
                    title: '补货商品',
                    dataIndex: 'bhGoods',
                    key: 'bhGoods',
                },{
                    title: '特征值',
                    dataIndex: 'tzz',
                    key: 'tzz',
                },{
                    title: '补货数量',
                    dataIndex: 'num',
                    key: 'num',
                },{
                    title: '补货时间',
                    dataIndex: 'bhTime',
                    key: 'bhTime',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    render:(text,record,index)=>{
                        return(
                            <a onClick={()=>this.editA(record)} href="javascript:;">查看详情</a>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','销售手动补货']));
    }
    editA(ap) {
        if(ap != null){
            this.props.history.push('/warehouseLayout/addPalletReplenishment/'+ap.id);
        }else{
             this.props.history.push('/warehouseLayout/addPalletReplenishment/'+0);
        }
    }
    render() {
        let {dataSource,columns} = this.state;
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={6}>
                        <Search placeholder="请输入补货编号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={10}>
                        <RangePicker onChange={(value)=> console.log(value)} />
                    </Col>
                    <Col span={4}>
                        <p>查询条件按需求增加</p>
                    </Col>
                    <Col span={4} className="textRight">
                        <Button onClick={()=>{this.props.history.push('/warehouseLayout/ContinueReplenishment')}} >继续补货</Button>
                        <Button className="ml-10" type="primary"  onClick={()=>{this.editA(null)}}>新增补货</Button>
                    </Col>
                </Row>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(palletReplenishment);