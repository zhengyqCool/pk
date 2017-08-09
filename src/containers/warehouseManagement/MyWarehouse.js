import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Icon,Switch,message} from 'antd';
import { connect } from 'react-redux';
// import Mock from 'mockjs';

import * as breadActions from '../../actions/breadActions';
import * as cont from '../../config/constant';

import {
  Link,
} from 'react-router-dom';

const Search = Input.Search;
class myGoodsShelf extends Component {
    constructor(props){
        super(props);
        this.state = {
            goodsListData:[],
            searchText:'',
        }
        this.columns = [{
                title: '编号',
                dataIndex: 'code',
            }, {
                title: '仓库名称',
                dataIndex: 'name'
            }, {
                title: '创建时间',
                dataIndex: 'createTime'
            },{
                title: '仓库地址',
                dataIndex: 'address'
            },{
                title: '管理员',
                dataIndex: 'operator'
            },{
                title: '状态',
                dataIndex: 'status',
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
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓管管理','我的仓库']));
        
        this.getWarehouseList(); //初始化仓库列表...
    }
    jumps(item){
         this.props.history.push('/warehouseManagement/sheflManagement/ShelfList/'+item.shopId);
    }

    getWarehouseList = ()=> {
        /*
        fetch(cont.getURL(cont.warehouseListUrl),{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                pagesize:0
            }
        }).then(function(response){
            console.log(response.text())
            return response.json()
        }).then(function(data){
            //
            if(data !== null || data !== undefined){
                if(data.code == 0){
                    if(data.warehouse !== []){
                        this.setState({
                            goodsListData:data.waerhouseList
                        })
                    }else{
                        console.log('waerhouseList is empty')
                    }
                }elsse{
                    massage.error(data.errmsg)
                }
            }
        },function(error){
            console.log(error);
        })
        */
        const data = [{
                key: '1',
                code: '001',
                name:'1#仓库',
                createTime:'2017-08-08',
                address: '大学科技园',
                operator:'张颂',
                status:false,
                shopId:1
            },{
                key: '2',
                code: '002',
                name:'2#仓库',
                address: '大学科技园',
                createTime:'2017-08-08',
                operator:'张颂',
                status:true,
                shopId:2
            },{
                key: '3',
                code: '003',
                name:'3#仓库',
                address: '大学科技园',
                createTime:'2017-08-08',
                operator:'张颂',
                status:false,
                shopId:2
            }]
        this.setState({
            goodsListData:data
        })
    }

    editA(ap) { //编辑
        let dispatch = this.props.dispatch;
        
        if(ap != null){ 
            // dispatch(waerhouseAction.editItemAction(ap.id))
            this.props.history.push('/warehouseManagement/AddWarehouse/'+ap.shopId);
        }else{
             this.props.history.push('/warehouseManagement/AddWarehouse/'+0);
        }
    }

    deleteItem(o){ //删除仓库
        /*
            fetch(cont.getURL(cont.delwarehouseUrl),{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:o.shopId
                }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                if(data !== null || data !==undefined){
                    if(data.code == 0){
                        //执行删除
                        let goodsListData = this.state.goodsListData;

                        for(let i = 0; i < goodsListData.length; i++){
                            if(o.shopId == goodsListData[i].shopId){
                                goodsListData.splice(i,1);
                            }
                        }
                        this.setState({
                            goodsListData:goodsListData
                        })
                    }else{
                        message.error(data.errmsg);
                    }
                }else{
                    console.log('data There is an error!')
                }
            }))
        */
        
        let goodsListData = this.state.goodsListData;

        for(let i = 0; i < goodsListData.length; i++){
            if(o.shopId == goodsListData[i].shopId){
                goodsListData.splice(i,1);
            }
        }
        this.setState({
            goodsListData:goodsListData
        })
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
                        <Button onClick={()=>{this.editA(null)}}>新建</Button>
                    </Col>
                </Row>
                <Table dataSource={this.state.goodsListData} columns={this.columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { }
}
export default connect(mapStateToProps)(myGoodsShelf);