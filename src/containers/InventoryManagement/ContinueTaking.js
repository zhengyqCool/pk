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

class ContinueTaking extends Component {
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
            },{
                key: '2',
                checkNo: '002',
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
            title: '操作',
            dataIndex: 'operation',
            render:(text,obj,index)=>(<a href="javascript:;" onClick={()=>{this.props.history.push('/InventoryManagement/AddStockTaking/'+obj.id);}}>继续盘点</a>)
        }];
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '库存管理','库存盘点','继续盘点']));
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
                        <Button onClick={()=>{this.props.history.go(-1)}} type="primary">返回</Button>
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
export default connect(mapStateToProps)(ContinueTaking);