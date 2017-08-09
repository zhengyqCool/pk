import React, { Component } from 'react';
import { Input, Table, Button, Row, Col} from 'antd';
// import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../../actions/breadActions';
import * as cont from '../../../config/constant';
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
            shelfListDate:[],
        }
        this.columns = [{
                title: '编号',
                dataIndex: 'code',
            }, {
                title: '货架名称',
                dataIndex: 'name',
            }, {
                title: '仓位数量',
                dataIndex: 'cargospaceNum',
            },{
                title: '状态',
                dataIndex: 'status',
            },{
                title: '备注信息',
                dataIndex: 'note',
                key: 'note',
            },{
                title: '操作',
                dataIndex: 'operation',
                width:'20%',
                render: (text, record, index) => {
                            return (<div>
                                <a href="javascript:void(0);" onClick={() => this.jumps(record,'add')}>编辑</a> | <a href="javascript:void(0);" onClick={() => this.jumps(record,'gl')}>货位管理</a> | <a href="javascript:void(0);" onClick={() => this.jumps(record,'look')}>查看详情</a> | <a href="javascript:void(0);" onClick={(index)=>this.deleteItem(index)} >删除</a>
                            </div>)
                        } 
            }
        ]
    };
    deleteItem(index){
        if(index != null){
            let arr = this.state.shelfListDate;
            arr.splice(index,1);
            this.setState({
                shelfListDate:arr
            })   
        }
    }

    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓库管理','我的仓库','货架管理']));

        this.getShelfList();
    }
    //初始化货架编号
    getShelfList(){
        console.log(this.state.ckId);
        
        // fetch(cont.getURL(cont.shelfListUrl),{
        //     method:'POST',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify({
        //         warehouseId:this.state.ckId,
        //         pagesize:0    
        //     })
        // }).then(function(response){
        //     return response.json()
        // }).then(function(data){
        //     if(data !== null || data !== undefined){
        //         if(data.code == 0){
        //             if(data.shelfList !== null && data.shelfList.length > 0){
        //                 this.setState({
        //                     shelfListDate:data.shelfList
        //                 })
        //             }else{
        //                 console.log('shelfList is empty')
        //             }
        //         }else{
        //             massage.error(data.errmsg)
        //         }
        //     }
        // },function(error){
        //     console.log(error);
        // })

        const data = [{
                key: '1',
                code: '001',
                name:'1#货架',
                cargospaceNum: '20',
                note:'hello 我是比较长的备注。',
                id:1,
                status:'启用',
            }, {
                key: '2',
                code: '002',
                name:'2#货架',
                cargospaceNum: '30',
                note:'hello 我备注。',
                status:'未启用',
                id:2
            }
        ]

        this.setState({
            shelfListDate:data
        })
    }

    jumps(item,todo){
        if(todo == 'look'){
            this.props.history.push('/warehouseManagement/sheflManagement/editShelf/LookShelf/'+item.id);
        }else if(todo == 'gl'){
            this.props.history.push('/warehouseManagement/sheflManagement/salverManangement/SalverList/'+item.id);
        }else{
            if(item !== null){
                this.props.history.push('/warehouseManagement/sheflManagement/AddShelf/'+item.id);
            }else{
                this.props.history.push('/warehouseManagement/sheflManagement/AddShelf/'+0);
            }
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
                <Table dataSource={this.state.shelfListDate} columns={this.columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(myGoodsShelf);