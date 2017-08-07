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
 
class StockRemoval extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            dataSource:[{
                key: '1',
                ckNo: '001',
                goodsNum:'50',
                ckType: '手动出库',
                jhdNo:'/',
                ckTime:'2017-05-06',
            },{
                key: '2',
                ckNo: '001',
                goodsNum:'50',
                ckType: '拣货单出库',
                jhdNo:'2156124515',
                ckTime:'2017-05-06',
            }]
            
        };
        this.columns = [{
            title: '出库编号',
            dataIndex: 'ckNo',
            key: 'ckNo',
        }, {
            title: '商品数量',
            dataIndex: 'goodsNum',
            key: 'goodsNum',
        }, {
            title: '出库类型',
            dataIndex: 'ckType',
            key: 'ckType',
        },{
            title: '拣货单号',
            dataIndex: 'jhdNo',
            key: 'jhdNo',
        },{
            title: '出库时间',
            dataIndex: 'ckTime',
            key: 'ckTime',
        },{
            title: '操作',
            dataIndex: 'operation',
            render:(text,record,index)=>{
                return(
                    <div>
                        <a href="javascript:;">查看详情</a> 
                    </div>
                )
            }
        }];
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '出库管理','手动出库']));
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={6}>
                        <Search placeholder="请输入出库编号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
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
                        <Button className="mr-10" onClick={()=>{this.props.history.push('/stockRemovalStrator/ManualStockRemoval')}} >手动出库</Button>
                        <Button type="primary" onClick={()=>{this.props.history.push('/stockRemovalStrator/AddStockRemoval')}} >拣货单出库</Button>
                    </Col>
                </Row>
                <Table dataSource={this.state.dataSource} columns={this.columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(StockRemoval);