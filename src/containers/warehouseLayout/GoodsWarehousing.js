import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker} from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

class GoodsWarehousing extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            dataSource:[
                {
                    key: '1',
                    no: '001',
                    rkTime:'2017-07-07',
                    goodsNum: '20',
                    wNum:'1#仓库',
                    rkName:'张颂',
                    rkType:'手动',
                    rkState:'已完成'
                },{
                    key: '2',
                    no: '002',
                    rkTime:'2017-07-07',
                    goodsNum: '20',
                    wNum:'1#仓库',
                    rkName:'张颂',
                    rkType:'验收单',
                    rkState:'未完成'
                },{
                    key: '3',
                    no: '004',
                    rkTime:'2017-07-07',
                    goodsNum: '20',
                    wNum:'1#仓库',
                    rkName:'张颂',
                    rkType:'手动',
                    rkState:'已完成'
                }
            ]
        }
        this.columns = [
            {
                title: '入库编号',
                dataIndex: 'no',
                key: 'no',
            }, {
                title: '入库时间',
                dataIndex: 'rkTime',
                key: 'rkTime',
            }, {
                title: '商品件数',
                dataIndex: 'goodsNum',
                key: 'goodsNum',
            },{
                title: '仓号',
                dataIndex: 'wNum',
                key: 'wNum',
            },{
                title: '入库人',
                dataIndex: 'rkName',
                key: 'rkName',
            },{
                title: '入库类型',
                dataIndex: 'rkType',
                key: 'rkType',
            },{
                title: '状态',
                dataIndex: 'rkState',
                key: 'rkState',
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (<div>
                                <a href="javascript:void(0);" onClick={() => this.editA(record)}>查看详情</a>
                                {(record.rkState == '未完成')?
                                    <span> | <a href="javascript:void(0);" onClick={() => this.editA(record)}>编辑</a></span>
                                    :
                                    null
                                }
                        </div>
                    )
                } 
            }
        ];
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','商品入库']));
    }
    editA(ap) {
        if(ap != null || ap != '' || ap != undefined){
            if( ap == 'sd' || ap == 'zd'){
                 this.props.history.push('/warehouseLayout/AddGoodsWarehousing/'+ ap);
            }else{
                this.props.history.push('/warehouseLayout/AddGoodsWarehousing/'+ap.id);
            }
        }
    }
    render() {
        let columns = this.columns;
        let { dataSource } = this.state;
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={9}>
                        <Search placeholder="请输入入库编号  " style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={9}>
                        <RangePicker onChange={(value)=> console.log(value)} />
                    </Col>
                    <Col span={6} style={{textAlign:'right'}}>
                        <Button onClick={()=>{this.editA('zd')}}>验收单入库</Button>
                        <Button className="ml-10" onClick={()=>{this.editA('sd')}}>手动入库</Button>
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
export default connect(mapStateToProps)(GoodsWarehousing);