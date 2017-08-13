import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Input, Table, Form, Button, Modal, Radio, Select, Row, Col, Icon, DatePicker, Search, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import * as approvalActions from '../../actions/approval/approvalActions';
import * as warehouseLayoutAction from '../../actions/warehouseLayout/warehouseLayoutAction';
import SelfTable from './selfTable/SelfTable';
import AutoSelfTable from './selfTable/AutoSelfTable';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

class AddGoodsWarehousing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            warehouseList:[],
            ysdDataSource:[]
        }
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        
        if(this.props.match.params.adid=='zd'){
            dispatch(breadActions.setBreads(['主页', '商品入库', '验收单入库']));
        }else{
            dispatch(breadActions.setBreads(['主页', '商品入库', '手动入库']));
        }
        this.initDataSource() 
    }   

    //初始化仓库列表、采购单号
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
        const data = [{
            code:'111111',
            id:1,
        },{
            code:'222222',
            id:2,
        },{
            code:'333333',
            id:3
        }]

        let arr = [];
        data.forEach(function(element) {
            arr.push(element.code);
        }, this);
        let ysdDataSource = arr;//验收单信息
        const warehouseList = [//仓库列表
            {
                name:'仓库1',
                id:1
            },{
                name:'仓库2',
                id:2
            },{
                name:'仓库3',
                id:3
            },
        ]

        this.setState({
            warehouseList:warehouseList,
            ysdDataSource:ysdDataSource
        })
    }
    showModal() {
        this.setState({
            modalVisible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    //输入采购单号加载商品列表
    ysdInitGoodsList(value){
        console.log(value);
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    //提交
    handleSubmit(e) {
        e.preventDefault();
        let form = this.props.form;
        form.validateFieldsAndScroll((err, values) => {//value is the object of form fields
            if (!err) {
                console.log(values);
                let dispatch = this.props.dispatch;
                dispatch(warehouseLayoutAction.ysdSearchAction(values))
            } else {
                Modal.error({
                    title: '验证错误',
                    content: '请确保输入正确的内容',
                });
            }
        });
    }


    handleAdd = () => { //手动入库增加一行
        let dispatch = this.props.dispatch;
        dispatch(warehouseLayoutAction.addTrAction())
    }

    render() {
        const warehouseList  = this.state.warehouseList.map((o,index)=>(<Option key={index} value={o.name}>{o.name}</Option>));
        
        const { getFieldDecorator,getFieldsError } = this.props.form; //表单验证

        const formItemLayout = { //调整自适应
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        let inputType = (this.props.match.params.adid=='sd')?true:false 

        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col span={6}>
                            <FormItem label='选择仓库' {...formItemLayout} >
                                {getFieldDecorator('warehouse', {
                                    rules: [{ required: true, message: '请选择仓库！' }],
                                })(
                                   <Select>
                                       {warehouseList}
                                   </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label='验收单号' {...formItemLayout} >
                                {getFieldDecorator('ysdNo', {
                                    rules: [{ required: true, message: '请输入验收单号！' }],
                                })(
                                   <AutoComplete
                                        dataSource={this.state.ysdDataSource}
                                        placeholder="请输入验收单号"
                                        onSelect={(value)=>this.ysdInitGoodsList(value)}
                                        disabled={ inputType}
                                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label='入库人' {...formItemLayout}>
                                {getFieldDecorator('rkr', {
                                    rules: [{ required: true, message: '请输入入库人！' }],
                                })(
                                  <Input type="text" placeholder='请输入入库人' />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Form.Item className="text-right">
                                {(this.props.match.params.adid == 'zd')? 
                                    <Button htmlType="submit" disabled={this.hasErrors(getFieldsError())} >开始</Button>
                                    :
                                    <Button onClick={this.handleAdd}>增加一行</Button>
                                }
                                <Button className="ml-10" type="primary" onClick={()=>{this.props.history.go(-1)}}>返回</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {(this.props.match.params.adid == 'zd')? 
                    <AutoSelfTable/> //验收单录入
                    :
                    <SelfTable/> //手动录入
                }

                <FormItem>
                    <div className="mt-10 text-center">
                        <Button type="primary">确认入库</Button>
                        <Button className="ml-10" >保存</Button>
                    </div>
                </FormItem>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
//export default connect(mapStateToProps)(ApprovalDefine);

export default Form.create()(connect(mapStateToProps)(AddGoodsWarehousing));

