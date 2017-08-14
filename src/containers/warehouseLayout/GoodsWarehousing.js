import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select,Radio} from 'antd';
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
            warehouseList:[],//仓库列表
            rkList:[],
        }
        this.columns = [
            {
                title: '入库编号',
                dataIndex: 'orderNo',
            }, {
                title: '入库时间',
                dataIndex: 'rkTime',
                key: 'rkTime',
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
                width:'10%',
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
    componentWillMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','商品入库']));
        this.getBePutiInStorage();//初始化列表
        this.getWarehouse();//获取仓库
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

    getWarehouse(){
        // fetch(cont.getURL(cont.replenishmentListUrl).then(function(response){
       //         return response.json()
       //     }).then(function(data){
       //         if(data.code == 0){
                   
       //         }else{
       //             message.error(data.errmsg)
       //         }
       //     },function(error){
       //         console.log(error);
       //     })

       let data = [{
           key: '1',
           code: '001',
           name:'1#仓库',
           createTime:'2017-08-08',
           address: '大学科技园',
           operator:'张颂',
           status:false,
           id:1
       },{
           key: '2',
           code: '002',
           name:'2#仓库',
           address: '大学科技园',
           createTime:'2017-08-08',
           operator:'张颂',
           status:true,
           id:2
       },{
           key: '3',
           code: '003',
           name:'3#仓库',
           address: '大学科技园',
           createTime:'2017-08-08',
           operator:'张颂',
           status:false,
           id:2
       }]
       this.setState({ warehouseList:data })
   }

   getBePutiInStorage(){
        // fetch(cont.getURL(cont.replenishmentListUrl).then(function(response){
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
                orderNo: '001',
                rkTime:'2017-07-07',
                wNum:'1#仓库',
                rkName:'张颂',
                rkType:'手动',
                rkState:'已完成'
            },{
                orderNo: '002',
                rkTime:'2017-07-07',
                wNum:'1#仓库',
                rkName:'张颂',
                rkType:'验收单',
                rkState:'未完成'
            },{
                orderNo: '004',
                rkTime:'2017-07-07',
                wNum:'1#仓库',
                rkName:'张颂',
                rkType:'手动',
                rkState:'已完成'
            }
        ]

        data.forEach((obj,index)=>{
            obj.key = index;
        })
        this.setState({
            rkList:data
        })
   }
    render() {
        let columns = this.columns;
        let { rkList } = this.state;
        const warehouseOption = this.state.warehouseList.map((anItem,index)=>(
            <Select.Option disabled={anItem.status} value={anItem.name + ''} key={anItem.id}>{anItem.name}</Select.Option>))
        return (
           <div style={{color:'#333'}}>
                <Row className="mb-10">
                    <Col span={5}>
                        <Select placeholder="请选择仓库" style={{ width: 180 }} onSelect={(value)=> {this.setState({warehouseName:value})}} >
                            {warehouseOption}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <RangePicker 
                            format="YYYY-MM-DD HH:mm:ss" 
                            onChange={(date,dateString)=> console.log(date,dateString)} 
                            showTime={{
                                hideDisabledOptions: true,
                            }} 
                        />
                    </Col>
                    <Col span={5}>
                        <Radio.Group onChange={value=> console.log(value)}>
                            <Radio.Button value="0">全部</Radio.Button>
                            <Radio.Button value="1">已完成</Radio.Button>
                            <Radio.Button value="2">草稿</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={5}>
                        <Radio.Group onChange={value=> console.log(value)}>
                            <Radio.Button value="0">全部</Radio.Button>
                            <Radio.Button value="1">手动</Radio.Button>
                            <Radio.Button value="2">验收单</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={3} style={{textAlign:'right'}}>
                        <Button onClick={()=>{this.editA('zd')}}>验收单入库</Button>
                        <Button className="ml-10" onClick={()=>{this.editA('sd')}}>手动入库</Button>
                    </Col>
                </Row>
                <Table dataSource={rkList} columns={columns} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(GoodsWarehousing);