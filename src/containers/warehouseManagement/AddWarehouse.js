import React, { Component } from 'react';
// import { PropTypes } from 'prop-types'
import { Input, Form, Button,Row,Col,Cascader,Checkbox} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'


//省市联动
const options = [{
    value: '河南',
    label: '河南',
    children: [{
        value: '郑州',
        label: '郑州',
        children: [{
            value: '中原区',
            label: '中原区',
        },{
            value: '高新区',
            label: '高新区',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
             value: 'zhonghuamen',
             label: 'Zhong Hua Men',
        }],
    }],
}]
class AddGoodsShelf extends Component {
    constructor(props) {
        super(props);
        this.state = { wId: '', }
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '货架管理','新建货架']));
        console.log(this.props.match.params.wId)//传过来的仓库ID
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
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
            <Form onSubmit={this.handleSubmit} >

                <Form.Item label='仓库编号' {...formItemLayout} >
                    {
                        getFieldDecorator('warehouseNo', {
                            rules: [{ required: true, message: '请输入仓库编号！' }],
                            initialValue:""
                        })(<Input type="text" placeholder='请输入仓库编号' />)
                    }
                </Form.Item>
                <Form.Item label='仓库名称' {...formItemLayout} >
                    {
                        getFieldDecorator('warehouseName', {
                            rules: [{ required: true, message: '请输入仓库名称！' }],
                            initialValue:""
                        })(<Input type="text" placeholder='请输入仓库名称' />)
                    }
                </Form.Item>
                <Form.Item label='仓库位置' {...formItemLayout} >
                    {
                        getFieldDecorator('district', {
                            rules: [{ required: true, message: '请设置仓位' }],
                        })(
                            <Cascader options={options} onChange={(value)=> console.log(value)} placeholder="请选择仓库位置" />
                        )
                    }
                </Form.Item>
                <Form.Item label='详细位置' {...formItemLayout} >
                    {
                        getFieldDecorator('site', {
                            rules: [{ required: true, message: '请输入详细位置！' }],
                            initialValue:""
                        })(<Input type="text" placeholder='请输入详细位置' />)
                    }
                </Form.Item>
                <Form.Item label='管理员' {...formItemLayout} >
                    {
                        getFieldDecorator('administrator', {
                            rules: [{ required: true, message: '请输入管理员！' }],
                            initialValue:""
                        })(<Input type="text" placeholder='请输入管理员姓名' />)
                    }
                </Form.Item>
                <Form.Item label='是否启用' {...formItemLayout} >
                    {
                        getFieldDecorator('state', {
                            rules: [{ required: true, message: '请输入管理员！' }],
                        })( <Checkbox onChange={(e)=> console.log(e.target.checked) }>启用</Checkbox>)
                    }
                </Form.Item>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                         <Button style={{width:120}} htmlType="submit" disabled={this.hasErrors(getFieldsError())} >确认保存</Button>
                         <Button className="ml-10" type="primary" onClick={()=>{this.props.history.go(-1)}} >返回</Button>
                    </Col>
                </Row>                  
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
//export default connect(mapStateToProps)(ApprovalDefine);

export default Form.create()(connect(mapStateToProps)(AddGoodsShelf));

