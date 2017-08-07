import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select,Badge } from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

class AutoPalletReplenishment extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            dataSource:[
                {
                    key: '1',
                    bhNo: '001',
                    bhGoods:'冰红茶',
                    brand:'康师傅',
                    norms:'100ml',
                    unit:'箱',
                    sku:'蜂蜜味',
                    num:'20',
                    need:'50',
                    salver:'6#货架3#货位',
                    repertory:'10',
                    needNum:'40'
                }
            ],
            columns:[
                {
                    title: '补货编号',
                    dataIndex: 'bhNo',
                    key: 'bhNo',
                },{
                    title: '补货商品',
                    dataIndex: 'bhGoods',
                    key: 'bhGoods',
                },{
                    title: '品牌',
                    dataIndex: 'brand',
                    key: 'brand',
                },{
                    title: '规格',
                    dataIndex: 'norms',
                    key: 'norms',
                },{
                    title: '单位',
                    dataIndex: 'unit',
                    key: 'unit',
                },{
                    title: '特征值',
                    dataIndex: 'sku',
                    key: 'sku',
                },{
                    title: '订单需求',
                    dataIndex: 'need',
                    key: 'need',
                },{
                    title: '货位',
                    dataIndex: 'salver',
                    key: 'salver',
                },{
                    title: '当前库存',
                    dataIndex: 'repertory',
                    key: 'repertory',
                },{
                    title: '需补数量',
                    dataIndex: 'needNum',
                    key: 'needNum',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    render:(text,record,index)=>{
                        return(
                            <a onClick={()=>this.editA(record)} href="javascript:;">去补货</a>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','销售自动补货']));
    }
    editA(ap) {
        if(ap != null){
            this.props.history.push('/warehouseLayout/AddAutoPalletReplenishment/'+ap.id);
        }else{
             this.props.history.push('/warehouseLayout/AddAutoPalletReplenishment/'+0);
        }
    }
    jumps = ()=> {
         this.props.history.push('/warehouseLayout/AutoContinueReplenishment');
    }
    render() {
        let {dataSource,columns} = this.state;
        return (
           <div style={{color:'#333'}}>
                <div className="text-right mb-10">
                    <Button className="mr-10" onClick={this.jumps}>继续补货</Button>
                    <Button type="primary" onClick={this.jumps}>查看补货记录</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(AutoPalletReplenishment);