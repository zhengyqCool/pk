import React, { Component } from 'react';
import { Input, Table,Radio, Button, Row, Col,Pagination,Icon,DatePicker,Select,Modal,Form} from 'antd';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import {
  Link,
} from 'react-router-dom';

const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

const classifyDate = [
    {
        name:'酒水饮料',
        id:1
    },
    {
        name:'坚果炒货',
        id:2
    },
    {
        name:'休闲食品',
        id:3
    }
]

const brandDate = [
    {name:'可口可乐',id:1},
    {name:'哇哈哈',id:2},
    {name:'雪碧',id:3},
    {name:'达利园',id:4},
    {name:'奥利奥',id:5},
    {name:'美汁源', id:6},
    {name:'红牛',id:7},
    {name:'汇源',id:8},
    {name:'统一',id:9}
]
class GoodsSale extends Component {
    constructor(props){
        super(props);
        this.state = {
            ModalData:{},
            visible:false,
            searchText:'',
            sxjState:false,
            columns:[{
                title: '商品编号',
                dataIndex: 'goodsNo',
                key: 'goodsNo',
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
                title: '操作',
                dataIndex:'operation',
                render:(text,record,index) => {
                    return (
                        <div>
                            <Operation sxjState={record.sxjState} record={record} /> | <a href="javascript:;" onClick={() => this.editA(record,index)} >编辑/查看</a>
                        </div>
                    )
                }
            }],
            dataSource:[{
                    key: '1',
                    goodsNo: '001',
                    goodsName:'某某商品',
                    norms: '10*20g',
                    eigenvalue:'味道',
                    goodsbrand:'哇哈哈',
                    shelf:'1#货架',
                    pallet:'4号位',
                    sxjState:false,
                },{
                    key: '2',
                    goodsNo: '002',
                    goodsName:'某某商品',
                    norms: '10*20g',
                    eigenvalue:'味道',
                    goodsbrand:'哇哈哈',
                    shelf:'1#货架',
                    pallet:'4号位',
                    sxjState:true,
                    id:2
                },
            ]
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['商品管理', '商品上架']));
    }
    //编辑
    editA(o,index){
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
        ****/
        this.setState({
            // ModalData: fetch data,
            visible:true,
            sxjState:o.sxjState
        })
    }
    
    //搜索
    onSearch(value){
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
                // if(data.code) ...change this.state.dataSource
            }).catch( (error) => {
                console.error(error);
            }).done();
        ****/
        console.log(value);
    }
    render() {
        let classifyList = classifyDate.map((o,index)=>(<Select.Option value={o.name} key={index}>{o.name}</Select.Option>));
        let brandList = brandDate.map((o,index)=>(<Select.Option value={o.name} key={index}>{o.name}</Select.Option>));
        return (
           <div style={{color:'#333'}}>
                <Modal
                    title="编辑商品"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={()=> this.setState({visible:false})}
                    width={'40%'}
                    >
                   <ModalBody
                        dataSource={this.state.ModalData}
                        form={this.props.form}
                        sxjState={this.state.sxjState}
                   />
                </Modal>
                <Row>
                    <Col span={5}>
                        <Search placeholder="输入商品编号/商品名称" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => this.onSearch(value)} />
                    </Col>
                    <Col span={5}>
                        <Select  allowClear={true} showSearch={true} defaultValue="选择分类" style={{ minWidth: 200 }} onChange={(value)=> console.log(value)}>
                            {classifyList}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Select allowClear={true} showSearch={true} defaultValue="选择品牌" style={{ minWidth: 200 }} onChange={(value)=> console.log(value)}>
                            {brandList}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Radio.Group onChange={(e)=>console.log(e.target.value)}>
                            <Radio.Button value="large">全部</Radio.Button>
                            <Radio.Button value="default">已上架</Radio.Button>
                            <Radio.Button value="small">未上架</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={4} className="textRight">
                        <Button>查询</Button>
                    </Col>
                </Row>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        )
    }
}

class Operation extends Component {
    constructor(props){
        super(props)
        this.state={
            sxjState:props.sxjState,
        }
    }

    //上下架
    goodsSj(){

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
    ****/

        
        this.setState({
            sxjState:!this.state.sxjState
        })
    }
    render(){
        return(
             <a onClick={()=>this.goodsSj()} style={{color:(this.state.sxjState?'#108ee9':'red')}} href="javascript:;" >{this.state.sxjState?'上架':'下架'}</a>
        )
    }
}

class ModalBody extends Component {
    constructor(props){
        super(props)
    }

    handleSubmit(){
        console.log("modal submit")
    }
    render(){
        let ap = this.props.dataSource;//默认值
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return(
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)} >
                    <Row>
                        <Col span={12}>
                            <Form.Item label='设置价格' {...formItemLayout} >
                                {
                                    getFieldDecorator('price', {
                                        rules: [{ required: false, message: '请输入价格' }],
                                        initialValue:''
                                    })(<Input defaultValue={'123123'} disabled={this.props.sxjState} type="text" placeholder='请输入价格' />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='设置起批量' {...formItemLayout} >
                                {
                                    getFieldDecorator('qpl', {
                                        rules: [{ required: false, message: '请输入起批量' }],
                                        initialValue:''
                                    })(<Input value={'123123'} disabled={this.props.sxjState} type="text" placeholder='请输入起批量' />)
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label='生产日期' {...formItemLayout} >
                                {
                                    getFieldDecorator('scDate', {
                                        rules: [{ required: false, message: '请输入价格' }],
                                        initialValue:''
                                    })(<DatePicker
                                            showTime
                                            style={{width:'100%'}}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="设置日期"
                                            onChange={(value,datestring)=>console.log()}
                                            onOk={(value)=> console.log(value)}
                                            disabled={this.props.sxjState}
                                        />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='设置步长' {...formItemLayout} >
                                {
                                    getFieldDecorator('setBc', {
                                        rules: [{ required: false, message: '请输入步长' }],
                                        initialValue:''
                                    })(<Input disabled={this.props.sxjState} type="text" placeholder='请输入步长' />)
                                }
                            </Form.Item>
                        </Col>
                    </Row>                
                </Form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default  Form.create()(connect(mapStateToProps)(GoodsSale));