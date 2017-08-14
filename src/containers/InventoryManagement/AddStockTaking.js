import React, { Component } from 'react';
import { Input, Table, Button, Row, Col,Pagination,Icon,DatePicker,Select,Tooltip,Popconfirm,message,InputNumber } from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;


class AddStockTaking extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            value:0,
            dataSource:[]
        }
        this.columns = [{
            title: '盘点编号',
            dataIndex: 'checkNo',
            key: 'checkNo',
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
        },{
            title: '实际库存',
            dataIndex: 'goodsNum',
             render:(text,obj,index)=>(<InputNumber min={0} defaultValue={0} onChange={(value)=>console.log(value)} /> )
        },{
            title: '误差',
            dataIndex: 'diff',
            render:(text,obj,index)=>(<span>6</span> )
        }];
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '库存管理','库存盘点','新增盘点']));
    }
    onChangeFc(value){
        switch(value){
            case '1':
                value="分类";
                this.setState({value:value});
                break;
            case '2':
                value="货架";
                this.setState({value:value});
                break;
            case '3':
                value=<Input className="GoodsData" onChange={(e)=>{this.GetData(e)}} placeholder="请输入商品名称"/>
                this.setState({value:value});
                break;
            case '4':
                value="库存";
                this.setState({value:value});
                break;
            default:
                this.setState({value:""});
        }
    }
    GetData(e){
        //this.initDataSource();
        console.log(e.target.value);
    }
    initDataSource(){
        /***
         fetch(PATH + '',{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: 'no-cors',
                body: ''
            }).then( (response) => response.json() ).then( (data) => {
                // if(data.code) ...
            }).catch( (error) => {
                console.error(error);
            }).done();
         ***/
    }
    start = ()=>{
        let data = [{
                key: '1',
                checkNo: '001',
                goodsName:'某某商品',
                norms: '10*20g',
                eigenvalue:'味道',
                goodsbrand:'哇哈哈',
                shelf:'1#货架',
                pallet:'4号位',
                inventory:'库存'
            },{
                key: '2',
                checkNo: '002',
                goodsName:'某某商品',
                norms: '10*20g',
                eigenvalue:'味道',
                goodsbrand:'哇哈哈',
                shelf:'1#货架',
                pallet:'4号位',
                inventory:'库存'
            }]

        this.setState({
            dataSource:data
        })
    }
    confirmFinish = (e)=>{
        console.log(e);
        message.success('Click on Yes');
    }

    render() {
        const  val  = this.state.value;
        const confirmTips = '是否更新库存？更新后不可修改';
        return (
           <div style={styles.container}>
               <div className="mb-10">
                    <Row>
                        <Col span={8}>
                            <Select defaultValue="选择盘点计划" style={{ minWidth: 200 }} onChange={(value)=> this.onChangeFc(value)}>
                                <Option value="1">分类</Option>
                                <Option value="2">货架</Option>
                                <Option value="3">商品</Option>
                                <Option value="4">库存</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            {val||""}
                        </Col>
                        <Col span={4}>
                            <p>查询条件按需求增加</p>
                        </Col>
                        <Col span={4} className="textRight">
                            <Button type="primary" onClick={this.start}>开始</Button>
                            <Button className="ml-10" onClick={()=>this.props.history.go(-1)} >返回</Button>
                        </Col>
                    </Row>
               </div>
               <Table  pagination={false} dataSource={this.state.dataSource} columns={this.columns} />
               <div className="text-center mt-10">
                    <Popconfirm 
                        title={confirmTips} 
                        onConfirm={this.confirmFinish.bind(this)} 
                        okText="确定" 
                        cancelText="取消"
                    >
                        <Button type="primary">完成盘点</Button>
                    </Popconfirm>
               </div>
            </div>
        )
    }
}

const styles = {
    container:{
        color:'#333'
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(AddStockTaking);