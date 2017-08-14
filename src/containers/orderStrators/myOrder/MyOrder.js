import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select,Radio,Checkbox } from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;
const dataSource = [{
  key: '1',
  orderNo: '001',
  client:'某某店铺',
  phone: '12345678910',
  orderState:'待发货',
  printState:'未打印',
  money:'$1000',
  privilege:'$0',
  cjTime:'2017-07-07 14:00'
},{
    key: '2',
    orderNo: '002',
    client:'某某店铺2',
    phone: '12345678910',
    orderState:'待发货',
    printState:'未打印',
    money:'$1000',
    privilege:'$2',
    cjTime:'2017-07-07 13:00'
}];
const rowSelection={
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};
class MyOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:''
        }
        this.columns = [{
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, {
            title: '下单店铺',
            dataIndex: 'client',
            key: 'client',
        }, {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: '订单状态',
            dataIndex: 'orderState',
            key: 'orderState',
        },{
            title: '打印状态',
            dataIndex: 'printState',
            key: 'printState',
        },{
            title: '金额',
            dataIndex: 'money',
            key: 'money',
        },{
            title: '优惠',
            dataIndex: 'privilege',
            key:'privilege'
        },{
            title: '创建时间',
            dataIndex: 'cjTime',
            key:'cjTime'
        },{
            title: '操作',
            dataIndex: 'operation',
            render:(text,record,index)=>{
                return(
                    <div>
                        <a href="javascript:;">打印拣货单</a> | <a href="javascript:;" onClick={this.jumps.bind(this,record)}>查看详情</a> | <a href="javascript:;">导出</a> 
                    </div>
                )
            }
        }];
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '订单管理','我的订单']));
    }
    jumps = (item)=> {
        console.log(item)
        if(item != undefined || item != null){
            this.props.history.push('/orderStrators/myOrder/OrderDetails');
        }
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={4}>
                        <Search placeholder="请输入订单号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={5}>
                        <RangePicker 
                            format="YYYY-MM-DD HH:mm:ss" 
                            onChange={(value)=> console.log(value)} 
                            showTime={{
                                hideDisabledOptions: true,
                            }}
                        />
                    </Col>
                    <Col span={4}>
                        <div className="pt-5">
                            <Checkbox onChange={(e)=> console.log(e.target.checked)}>今日订单</Checkbox>
                        </div>
                    </Col>
                    <Col span={4}>
                        <Radio.Group onChange={this.handleSizeChange}>
                            <Radio.Button value="large">全部</Radio.Button>
                            <Radio.Button value="default">待发货</Radio.Button>
                            <Radio.Button value="small">已发货</Radio.Button>
                        </Radio.Group>
                    </Col>
                     <Col span={3} className="textRight">
                         <Button type="primary">一键打印</Button>
                    </Col>
                    <Col span={4} className="textRight">
                         <Button type="primary">设置打印机属性</Button>
                    </Col>
                </Row>
               <Table rowSelection={rowSelection} columns={this.columns} dataSource={dataSource} />
                {/*<Table dataSource={dataSource} columns={this.columns} />*/}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(MyOrder);