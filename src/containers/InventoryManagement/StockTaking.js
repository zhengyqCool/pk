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

class StockTaking extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            dataSource:[{
                key: '1',
                checkNo: '001',
                pdTime:'2017-09-09',
                pdType: '商品分类盘点',
                goodsNum:'60',
                diffTotal:'20'
            }]
        };
        this.columns = [{
            title: '盘点编号',
            dataIndex: 'checkNo',
            key: 'checkNo',
        }, {
            title: '盘点时间',
            dataIndex: 'pdTime',
            key: 'pdTime',
        }, {
            title: '盘点类型',
            dataIndex: 'pdType',
            key: 'pdType',
        },{
            title: '商品件数',
            dataIndex: 'goodsNum',
            key: 'goodsNum',
        },{
            title: '总误差',
            dataIndex: 'diffTotal',
            key: 'diffTotal',
        },{
            title: '查看详情',
            dataIndex: 'details',
           render:(text,obj,index)=>(<a href="javascript:;">查看详情</a>)
        }];
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '库存管理','库存盘点']));
    }
    editA(ap) {
        if(ap != null){
            this.props.history.push('/InventoryManagement/AddStockTaking/'+ap.id);
        }else{
             this.props.history.push('/InventoryManagement/AddStockTaking/'+0);
        }
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={8}>
                        <Search placeholder="输入盘点编号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={8}>
                        <RangePicker onChange={(value)=> console.log(value)} />
                    </Col>
                    <Col span={4}>
                        <p>查询条件按需求增加</p>
                    </Col>
                    <Col span={4} className="textRight">
                        <Button className="mr-10" onClick={()=>{this.props.history.push('/InventoryManagement/ContinueTaking')}}>继续盘点</Button>
                        <Button onClick={()=>{this.editA(null)}} type="primary">新增盘点</Button>
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
export default connect(mapStateToProps)(StockTaking);