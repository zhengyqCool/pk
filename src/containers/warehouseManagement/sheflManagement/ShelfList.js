import React, { Component } from 'react';
import { Input, Table, Button, Row, Col} from 'antd';
// import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../../actions/breadActions';
// import {
//   Link,
// } from 'react-router-dom';

const Search = Input.Search;
class myGoodsShelf extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            ckId:props.match.params.ckid,
            dataSource:[{
                    key: '1',
                    no: '001',
                    name:'1#货架',
                    num: '20',
                    note:'hello 我是比较长的备注。',
                    id:1,
                }, {
                    key: '2',
                    no: '002',
                    name:'2#货架',
                    num: '30',
                    note:'hello 我备注。',
                    id:2
                }
            ],
            columns :[{
                    title: '编号',
                    dataIndex: 'no',
                    key: 'no',
                }, {
                    title: '货架名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '仓位数量',
                    dataIndex: 'num',
                    key: 'num',
                },{
                    title: '备注信息',
                    dataIndex: 'note',
                    key: 'note',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                                return (<div>
                                   <a href="javascript:void(0);" onClick={() => this.jumps(record,'gl')}>货位管理</a> | <a href="javascript:void(0);" onClick={() => this.jumps(record,'look')}>查看详情</a> | <a href="javascript:void(0);" onClick={(index)=>this.deleteItem(index)} >删除</a>
                                </div>)
                            } 
                }
            ]
        }
    }
    deleteItem(index){
        if(index != null){
            this.setState({
                dataSource:this.state.dataSource.splice(index,1)
            })   
        }
    }

    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓库管理','我的仓库','货架管理']));
    }
    jumps(item,todo){
        if(todo == 'look'){
            this.props.history.push('/warehouseManagement/sheflManagement/editShelf/LookShelf/'+item.id);
        }else if(todo == 'gl'){
            this.props.history.push('/warehouseManagement/sheflManagement/salverManangement/SalverList/'+item.id);
        }else{
            this.props.history.push('/warehouseManagement/sheflManagement/AddShelf/'+0);
        }
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={12}>
                        <Search placeholder="请输入货架名称或者货架编号  " style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={6}>
                         <span>{'仓库ID' + this.state.ckId}</span>
                    </Col>
                    <Col span={6} style={{textAlign:'right'}}>
                        <Button onClick={()=>{this.jumps(null,'add')}}>新建</Button>
                        <Button type="primary" className="ml-10" onClick={()=>{this.props.history.go(-1)}}>返回</Button>
                    </Col>
                </Row>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(myGoodsShelf);