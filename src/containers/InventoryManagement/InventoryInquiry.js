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
const dataSource = [{
  key: '1',
  goodsNo: '001',
  goodsName:'某某商品',
  norms: '10*20g',
  eigenvalue:'味道',
  goodsbrand:'哇哈哈',
  shelf:'1#货架',
  pallet:'4号位',
  inventory:'库存'
}];

const columns = [{
    title: '商品编号',
    dataIndex: 'goodsNo',
    key: 'goodsNo',
}, {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
}, {
  title: '规格',
  dataIndex: 'norms',
  key: 'norms',
},{
  title: '特征值',
  dataIndex: 'eigenvalue',
  key: 'eigenvalue',
},{
  title: '品牌',
  dataIndex: 'goodsbrand',
  key: 'goodsbrand',
},{
  title: '货架',
  dataIndex: 'shelf',
  key: 'shelf',
},{
    title: '货位',
    dataIndex: 'pallet',
    key:'pallet'
},{
    title: '库存',
    dataIndex: 'inventory',
    key:'inventory'
}];
class InventoryInquiry extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:''
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '库存管理','库存查询']));
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={4}>
                        <Search placeholder="输入商品名称或者商品编码" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={4}>
                        <Select
                            showSearch
                            style={{ width: 160 }}
                            placeholder="请选择分类"
                            optionFilterProp="children"
                            onChange={(value)=> console.log(value)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            showSearch
                            style={{ width: 160 }}
                            placeholder="选择货架"
                            optionFilterProp="children"
                            onChange={(value)=> console.log(value)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            showSearch
                            style={{ width: 160 }}
                            placeholder="选择货位"
                            optionFilterProp="children"
                            onChange={(value)=> console.log(value)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p>查询条件按需求增加</p>
                    </Col>
                    <Col span={4} className="textRight">
                         <Button type="primary">查询</Button>
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
export default connect(mapStateToProps)(InventoryInquiry);