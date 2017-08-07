import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select } from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;
const dataSource = [{
  key: '1',
  bhNo: '001',
  ccw:'1#货架6#位',
  chw: '3#货架2#位',
  bhGoods:'补货商品',
  num:'20',
  bhTime:'2017-07-07 14:00'
}];

const columns = [{
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
             <a href="javascript:;">查看详情</a>
        )
    }
}];
class OrderStatistics extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:''
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '订单管理','订单统计']));
    }
    editA(ap) {
        if(ap != null){
            this.props.history.push('/warehouseLayout/addPalletReplenishment/'+ap.id);
        }else{
             this.props.history.push('/warehouseLayout/addPalletReplenishment/'+0);
        }
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={6}>
                        <Search placeholder="请输入订单号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={6}>
                        <RangePicker onChange={(value)=> console.log(value)} />
                    </Col>
                    <Col span={4}>
                        <Select showSearch={true} defaultValue="请选择便利店" style={{ minWidth: 200 }} onChange={(value)=> console.log(value)}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p>查询条件按需求增加</p>
                    </Col>
                    <Col span={4} className="textRight">
                         <Button type="primary"  onClick={()=>{this.editA(null)}}>查询</Button>
                    </Col>
                </Row>
                <Row className="statistics-text">
                    <Col span={6}>
                        <label>总额<span>$10000000000</span></label>
                    </Col>
                    <Col  span={6}>
                        <label>订单数<span>10000</span></label>
                    </Col>
                    <Col  span={6}>
                        <label>余额使用<span>10000</span></label>
                    </Col>
                    <Col  span={6}>
                        <label>优惠<span>$10000</span></label>
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
export default connect(mapStateToProps)(OrderStatistics);