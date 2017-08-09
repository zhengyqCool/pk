import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select,Radio} from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import * as cont from '../../../../config/constant';


const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

class ReplenishmentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            dataSource:[
                {
                    key: '1',
                    bhNo: '001',
                    type:'手动',
                    bhstate:'已补货',
                    bhstateId:1,
                    bhTime:'2017-07-07 14:00'
                },{
                    key: '2',
                    bhNo: '002',
                    type:'自动',
                    bhstate:'未补货',
                    bhstateId:2,
                    bhTime:'2017-07-07 14:00'
                },{
                    key: '3',
                    bhNo: '003',
                    type:'手动',
                    bhstate:'草稿',
                    bhstateId:0,
                    bhTime:'2017-07-07 14:00'
                }
            ],
            columns:[
                {
                    title: '补货单号',
                    dataIndex: 'bhNo',
                    key: 'bhNo',
                },{
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                },{
                    title: '状态',
                    dataIndex: 'bhstate',
                    key: 'bhstate',
                },{
                    title: '创建时间',
                    dataIndex: 'bhTime',
                    key: 'bhTime',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    render:(text,record,index)=>{
                        return(
                            <div>
                                 <a onClick={()=>this.editA(record)} href="javascript:;">查看详情</a> 
                                { (record.bhstateId == 2 || record.bhstateId == 0)?
                                   <span> | <a onClick={()=>this.editA(record)} href="javascript:;">编辑</a></span>
                                    :
                                    null
                                } {(record.bhstateId == 0)?
                                    <span> | <a onClick={()=>this.editA(record)} href="javascript:;">删除</a></span>
                                    :
                                    null
                                }
                            </div>
                        ) 
                    }
                }
            ]
        }
    }
    componentWillMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','补货列表']));

    }

    getReplenishment(){
        fetch(cont.getURL(cont.shiftgoodsOrderListUrl),{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:cont.getPostParams({
                    pagesize:0
                })
            }).then(function(response){
                return response.json()
            }).then(function(data){
                if(data.code == 0){
                    
                }else{
                    message.error(data.errmsg)
                }
            },function(error){
                console.log(error);
            })
    }

    editA(ap) {
        if(ap != null){
            this.props.history.push('/warehouseLayout/addPalletReplenishment/'+ap.id);
        }else{
             this.props.history.push('/warehouseLayout/addPalletReplenishment/'+0);
        }
    }
    render() {
        let {dataSource,columns} = this.state;
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={4}>
                        <Search placeholder="请输入补货单号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={7}>
                        <RangePicker onChange={(value)=> console.log(value)} />
                    </Col>
                    <Col span={5}>
                        <Radio.Group onChange={this.handleSizeChange}>
                            <Radio.Button value="0">全部</Radio.Button>
                            <Radio.Button value="1">已补货</Radio.Button>
                            <Radio.Button value="2">未补货</Radio.Button>
                            <Radio.Button value="3">草稿</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <Radio.Group onChange={this.handleSizeChange}>
                            <Radio.Button value="0">全部</Radio.Button>
                            <Radio.Button value="1">手动</Radio.Button>
                            <Radio.Button value="2">自动</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={4} className="text-right">
                        <Button onClick={()=>{this.props.history.push('/warehouseLayout/AddAutoReplenishment')}} >自动补货</Button>
                        <Button  onClick={()=>{this.props.history.push('/warehouseLayout/AddPalletReplenishment')}} className="ml-10"  onClick={()=>{this.editA(null)}}>手动补货</Button>
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
export default connect(mapStateToProps)(ReplenishmentList);