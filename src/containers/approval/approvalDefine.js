import React, { Component } from 'react';
import { Input, Table, Form, Button, Modal ,Radio,Select,} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'
import * as approvalActions from '../../actions/approval/approvalActions'


class ApprovalDefine extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '' }
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        let match=this.props.match;
        console.log(this.props)
        let id=match.params.adid;
        console.log('react route params adid:::::'+id);
        if(id===0){
            dispatch(breadActions.setBreads(['主页', '审批流', '列表', '新建']));
        }else{
            dispatch(breadActions.setBreads(['主页', '审批流', '列表', '编辑']));
        }
        dispatch(approvalActions.initBusiTypes(dispatch));
        if(id>0){
            dispatch(approvalActions.loadApprovalDefine(dispatch,id));
        }
        console.log('ApprovalDefine:::ApprovalDefine::::' + this.props.approval.approvalDefine)
    }
    handleSubmit(e) {
        e.preventDefault();
        let form = this.props.form;
        let ap=this.props.approval.approvalDefine;
        let dispatch=this.props.dispatch;
        form.validateFieldsAndScroll((err, values) => {//value is the object of form fields
            if (!err) {
                console.log('Received values of form: ', values);
                dispatch(approvalActions.save(dispatch,ap,values,this.props.history));
            } else {
                Modal.error({
                    title: '验证错误',
                    content: '请确保输入正确的内容',
                });
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        
        let ap = this.props.approval.approvalDefine;
        
        
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
        let busitypeeach=this.props.approval.busiTypes.map((busiType,indx)=>(<Select.Option value={busiType.id+''} key={busiType.id}>{busiType.name}</Select.Option>))
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} >

                <Form.Item label='名字' {...formItemLayout} >
                    {
                        getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入名称!' }],
                            initialValue: ap.name,
                        })(<Input type="text" placeholder='请输入名字!' />)
                    }
                </Form.Item>
                <Form.Item label='流程key' {...formItemLayout} >
                    {
                        getFieldDecorator('processKey', {
                            rules: [{ required: true, message: '流程key!' }],
                            initialValue: ap.processKey,
                        })(<Input type="text" placeholder='请输入流程key!' />)
                    }
                </Form.Item>
                <Form.Item label='任务节点' {...formItemLayout} >
                    {
                        getFieldDecorator('activitiID', {
                            rules: [{ required: true, message: '请输入任务节点!' }],
                            initialValue: ap.activitiID,
                        })(<Input type="text" placeholder='请输入任务节点!' />)
                    }
                </Form.Item>
                <Form.Item label='序号' {...formItemLayout} >
                    {
                        getFieldDecorator('indx', {
                            rules: [{ required: true, message: '请输入序号!' }],
                            initialValue: ap.indx,
                        })(<Input type="text" placeholder='请输入序号!' />)
                    }
                </Form.Item>
                <Form.Item label='状态' {...formItemLayout} >
                    {
                        getFieldDecorator('valid', {
                            rules: [{ required: true, message: '请输入名称!' }],
                            initialValue: ap.valid,
                        })(
                            <Radio.Group>
                                <Radio value={true}>有效</Radio>
                                <Radio value={false}>无效</Radio>
                            </Radio.Group>
                            )
                    }
                </Form.Item>
                <Form.Item label='单据类型' {...formItemLayout} >
                    {
                        getFieldDecorator('sheettype', {
                            rules: [{ required: true, message: '请选择单据类型!' }],
                            initialValue: ap.sheettype,
                        })(
                            <Select>
                                <Select.Option value="自带物资">自带物资</Select.Option>
                                <Select.Option value="携带厂内物资">携带厂内物资</Select.Option>
                                <Select.Option value="人员来访单" >人员来访单</Select.Option>
                                <Select.Option value="长期卡申请">长期卡申请</Select.Option>
                                <Select.Option value="车辆运输单">车辆运输单</Select.Option>
                                <Select.Option value="维修申请单">维修申请单</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='业务类型' {...formItemLayout} >
                    {
                        getFieldDecorator('bsTypeID', {
                            initialValue: ap.bsTypeID,
                        })(
                            <Select>
                                {busitypeeach}
                            </Select>

                        )
                    }
                </Form.Item>
                <Form.Item label='formkey' {...formItemLayout} >
                    {
                        getFieldDecorator('formkey', {
                            rules: [{ required: true, message: '请输入名称!' }],
                            initialValue: ap.formkey,
                        })(<Input type="text" placeholder='请输入名字!' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayout}>
                    <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())} >
                        确定
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        approval: state.approval,
    }
}
//export default connect(mapStateToProps)(ApprovalDefine);

export default Form.create()(connect(mapStateToProps)(ApprovalDefine));

