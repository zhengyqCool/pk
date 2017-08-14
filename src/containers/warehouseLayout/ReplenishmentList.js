import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select,Radio,message} from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment'

import * as breadActions from '../../actions/breadActions';
import * as cont from '../../config/constant';


const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

class ReplenishmentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            replenishmentList:[],
        }
        this.columns = [
            {
                title: '补货单号',
                dataIndex: 'code',
            },{
                title: '类型',
                dataIndex: 'type',
            },{
                title: '状态',
                dataIndex: 'status',
            },{
                title: '创建时间',
                dataIndex:'creatTime'
            },{
                title: '操作',
                dataIndex: 'operation',
                width:'15%',
                render:(text,record,index)=>{
                    return(
                        <div>
                            <a onClick={()=>this.editA(record,'look')} href="javascript:;">查看详情</a> 
                            { (record.status == '未补货' || record.status =='草稿')?
                                <span> | <a onClick={()=>this.editA(record,'add')} href="javascript:;">编辑</a></span>
                                :
                                null
                            } {(record.status == '草稿')?
                                <span> | <a href="javascript:;">删除</a></span>
                                :
                                null
                            }
                        </div>
                    ) 
                }
            }
        ]
    }
    componentWillMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','补货列表']));

        this.getReplenishment()

    }

    getReplenishment(){
        // fetch(cont.getURL(cont.shiftgoodsOrderListUrl),{
        //         method:'POST',
        //         headers:{
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body:cont.getPostParams({
        //             pagesize:0
        //         })
        //     }).then(function(response){
        //         return response.json()
        //     }).then(function(data){
        //         if(data.code == 0){
                    
        //         }else{
        //             message.error(data.errmsg)
        //         }
        //     },function(error){
        //         console.log(error);
        //     })


        const data = [
            {
                key: '1',
                code: '001',
                type:'手动',
                id:1,
                creatTime:'2017-07-07 14:00',
                status:'已补货',
            },{
                key: '2',
                code: '002',
                type:'自动',
                id:2,
                creatTime:'2017-07-07 14:00',
                status:'未补货',
            },{
                key: '3',
                code: '003',
                type:'手动',
                id:3,
                creatTime:'2017-07-07 14:00',
                status:'草稿',
            }
        ]
        this.setState({
            replenishmentList:data
        })
    }

    editA(ap,key) {
        if(key == 'add'){
            if(ap != null){
                this.props.history.push('/warehouseLayout/AddPalletReplenishment/'+ap.id);
            }else{
                this.props.history.push('/warehouseLayout/AddPalletReplenishment/'+0);
            }
        }else{
            this.props.history.push('/warehouseLayout/ReplenishmentListDetails/'+ap.id);
        }
        
    }
    render() {
        return (
           <div style={{color:'#333'}}>
                <Row>
                    <Col span={4}>
                        <Search placeholder="请输入补货单号" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={7}>
                        <RangePicker 
                            format="YYYY-MM-DD HH:mm:ss"
                            defaultValue={[Moment('2015-06-06 15:20'), Moment('2015-06-06 18:50')]} 
                            onChange={(data,dateStrings)=> console.log(data,dateStrings)} 
                            showTime={{
                                hideDisabledOptions: true,
                        }} />
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
                        <Button className="ml-10"  onClick={()=>this.editA(null,'add')} >手动补货</Button>
                    </Col>
                </Row>
                <Table dataSource={this.state.replenishmentList} columns={ this.columns } />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(ReplenishmentList);