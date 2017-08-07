import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,Switch} from 'antd';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import * as waerhouseAction from '../../actions/waerhouse/waerhouseAction';
import {
  Link,
} from 'react-router-dom';

const Search = Input.Search;
class myGoodsShelf extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            columns:[{
                    title: '编号',
                    dataIndex: 'no',
                    key: 'no',
                }, {
                    title: '仓库名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                title: '仓库地址',
                dataIndex: 'site',
                key: 'site',
                },{
                title: '管理员',
                dataIndex: 'admin',
                key: 'admin',
                },{
                title: '状态',
                dataIndex: 'state',
                render: (text, record, index) => {
                                return (<div>
                                    <Switch defaultChecked={text?true:false} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                                </div>)
                            } 
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                                return (<div>
                                    <a href="javascript:void(0);" onClick={() => this.editA(record,'')}>编辑</a> | <a href="javascript:void(0);" onClick={() => this.jumps(record)}>货架管理</a> | <a href="javascript:void(0);" onClick={()=> this.deleteItem(record)}>删除</a>
                                </div>)
                            } 
                }
            ]
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓管管理','我的仓库']));
    }
    jumps(item){
         this.props.history.push('/warehouseManagement/sheflManagement/ShelfList/'+item.id);
    }
    editA(ap) { //编辑
        let dispatch = this.props.dispatch;
        
        if(ap != null){ 
            dispatch(waerhouseAction.editItemAction(ap.id))
            this.props.history.push('/warehouseManagement/AddWarehouse/'+ap.id);
        }else{
             this.props.history.push('/warehouseManagement/AddWarehouse/'+0);
        }
    }

    deleteItem(o){
        let dispatch = this.props.dispatch;
        dispatch(waerhouseAction.deleteItemAction(o.id))
    }
    render() {
        let itemList = this.props.itemList
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={12}>
                        <Search placeholder="请输入仓库名称/编号查询" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <Button type="primary" style={{marginRight:10}}>查询</Button> 
                        <Button onClick={()=>{this.editA(null)}}>新建</Button>
                    </Col>
                </Row>
                <Table dataSource={itemList} columns={this.state.columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        itemList:state.waerhouse
    }
}
export default connect(mapStateToProps)(myGoodsShelf);