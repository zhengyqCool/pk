import React, { Component } from 'react';
// import { PropTypes } from 'prop-types'
import { Input, Form, Button,Row,Col,Cascader,Checkbox,massage} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'
import * as cont from '../../config/constant';


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
        this.state = { 
            wId:0,
            warehouseData:{}
        }
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '货架管理','新建货架']));

        this.setState({wId:this.props.match.params.wId})//传过来的仓库ID
        
        this.getWarehousseData(this.props.match.params.wId)//编辑页面
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let url = '';
                if(this.state.wId == 0){
                    url = cont.getURL(cont.newwarehouseUrl);
                }else{
                    url = cont.getURL(cont.updatewarehouseUrl);
                }
                // fetch(url,{
                //     method:'POST',
                //     headers:{
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body:JSON.stringify({
                //         id:this.state.wId,
                //         code:values.code,
                //         name:values.name,
                //         address:values.address,
                //         operator:values.operator,
                //         status:values.status,
                //     })
                // }).then(function(response){
                //     return response.json()
                // }).then(function(data){
                //     if(data !== null || data !== undefined){
                //         if(data.code == 0){
                //             this.props.history.push( )//跳转到仓库列表页面
                //         }else{
                //             massage.error(data.errmsg)
                //         }
                //     }
                // },function(error){
                //     console.log(error);
                // })
                this.props.history.push('/warehouseManagement/MyWarehouse')
            }
        });
    }

    getWarehousseData(id){ //编辑页面
        if(id != 0){
            // fetch(cont.getURL(cont.warehouseinfoUrl),{
            //     method:'POST',
            //     headers:{
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body:JSON.stringify({
            //         id:id
            //     })
            // }).then(function(response){
            //     return response.json()
            // }).then(function(data){
            //     if(data !== null || data !== undefined){
            //         if(data.code == 0){
            //             this.setState({
            //                 warehouseData:data.info
            //             })
            //         }else{
            //             massage.error(data.errmsg)
            //         }
            //     }
            // },function(error){
            //     console.log(error);
            // })
            const data = {
                code: '003',
                name:'3#仓库',
                address: '大学科技园',
                createTime:'2017-08-08',
                operator:'张颂',
                status:true,
                shopId:2
            }
            this.setState({
                warehouseData:data
            })
        }
    }

    render() {
        const { warehouseData } = this.state;
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
                        getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入仓库编号！' }],
                            initialValue:warehouseData.code
                        })(<Input type="text" placeholder='请输入仓库编号' />)
                    }
                </Form.Item>
                <Form.Item label='仓库名称' {...formItemLayout} >
                    {
                        getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入仓库名称！' }],
                            initialValue:warehouseData.name
                        })(<Input type="text" placeholder='请输入仓库名称' />)
                    }
                </Form.Item>
                <Form.Item label='仓库地址' {...formItemLayout} >
                    {
                        getFieldDecorator('address', {
                            rules: [{ required: true, message: '请设置仓库地址！' }],
                        })(
                            <Cascader options={options} onChange={(value)=> console.log(value)} placeholder="请设置仓库地址" />
                        )
                    }
                </Form.Item>
                <Form.Item label='详细位置' {...formItemLayout} >
                    {
                        getFieldDecorator('site', {
                            rules: [{ required: true, message: '请输入详细位置！' }],
                            initialValue:warehouseData.site
                        })(<Input type="text" placeholder='请输入详细位置' />)
                    }
                </Form.Item>
                <Form.Item label='管理员' {...formItemLayout} >
                    {
                        getFieldDecorator('operator', {
                            rules: [{ required: true, message: '请输入管理员！' }],
                            initialValue:warehouseData.operator
                        })(<Input type="text" placeholder='请输入管理员姓名' />)
                    }
                </Form.Item>
                <Form.Item label='是否启用' {...formItemLayout} >
                    {
                        getFieldDecorator('status', {
                            rules: [{ required: false}],
                            initialValue:true
                        })( <Checkbox defaultChecked={true}  onChange={(e)=> console.log(e.target.checked) }>启用</Checkbox>)
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

