import React, { Component } from 'react';
import { Input, Form, Button ,InputNumber } from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../../actions/breadActions'


class AddShelf extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '' }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '货架管理','新建货架']));
    }
    render() {
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
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Item label='货架编号' {...formItemLayout} >
                    {
                        getFieldDecorator('sheflNo', {
                            rules: [{ required: true, message: '请输入货架编号！' }],
                        })(<Input type="text" placeholder='请输入货架编号' />)
                    }
                </Form.Item>
                <Form.Item label='货架名称' {...formItemLayout} >
                    {
                        getFieldDecorator('shelfName', {
                            rules: [{ required: true, message: '请输入货架名称！' }],
                        })(<Input type="text" placeholder='请输入货架名称' />)
                    }
                </Form.Item>
                 <Form.Item label='请设置货位数量' {...formItemLayout} >
                    {
                        getFieldDecorator('salverNum', {
                            rules: [{ required: true, message: '请设置托盘数量' }],
                        })( <InputNumber min={0} onChange={(value)=>console.log(value)} /> )
                    }
                </Form.Item>
                 <Form.Item label='备注信息' {...formItemLayout} >
                    {
                        getFieldDecorator('note', {
                            rules: [{ required: false,}],
                        })(<Input type="text" placeholder='请输入备注信息' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayout} className="text-center">
                    <Button htmlType="submit">确认保存</Button>
                    <Button className="ml-10" type="primary" onClick={()=>{this.props.history.go(-1)}} >返回</Button>
                </Form.Item>                
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
       data:state.waerhouse
    }
}
//export default connect(mapStateToProps)(ApprovalDefine);

export default Form.create()(connect(mapStateToProps)(AddShelf));

