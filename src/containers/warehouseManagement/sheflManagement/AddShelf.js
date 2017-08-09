import React, { Component } from 'react';
import { Input, Form, Button ,InputNumber,Checkbox,massage} from 'antd';
import { connect } from 'react-redux';
import * as breadActions from '../../../actions/breadActions';
import * as cont from '../../../config/constant';


class AddShelf extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shelfId: props.match.params.sId,
            shelfData:{}

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // let url = '';
                // if(this.state.salverId == 0){
                //     url = cont.getURL(cont.newshelfUrl);
                // }else{
                //     url = cont.getURL(cont.updateshelfUrl);
                // }
                // fetch(url,{
                //     method:'POST',
                //     headers:{
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body:JSON.stringify({
                //         id:this.state.salverId,
                //         code:values.code,
                //         name:values.name,
                //         cargospaceNum:values.cargospaceNum,
                //         status:values.status,
                //     })
                // }).then(function(response){
                //     return response.json()
                // }).then(function(data){
                //     if(data !== null || data !== undefined){
                //         if(data.code == 0){
                //             this.props.history.push( )//跳转至列表页面  
                //         }else{
                //             massage.error(data.errmsg)
                //         }
                //     }
                // },function(error){
                //     console.log(error);
                // })
                // this.props.history.push('/warehouseManagement/sheflManagement/ShelfList');
                this.props.history.go(-1);
            }
        });
    }
    componentWillMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '货架管理','新建货架']));
        // console.log(this.props.match.params.sId);
        
        this.getShelfDate(this.props.match.params.sId);
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    
    getShelfDate(id){ //编辑页面
        if(id != 0){
            // fetch(cont.getURL(cont.warehouseinfoUrl),{
            //     method:'POST',
            //     headers:{
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body:cont.getPostParams({
            //         id:id
            //     })
            // }).then(function(response){
            //     return response.json()
            // }).then(function(data){
            //     if(data.code == 0){
            //         this.setState({
            //             shelfData:data.shelf
            //         })
            //     }else{
            //         massage.error(data.errmsg)
            //     }
            // },function(error){
            //     console.log(error);
            // })
            const data = {
                code: '003',
                name:'1#货架',
                note: '我是一些备注信息~~~~~~~~~',
                status:true,
            }
            this.setState({
                shelfData:data
            })
        }
    }

    render() {
        const { getFieldDecorator,getFieldsError} = this.props.form;
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
        const { shelfData } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Item label='货架编号' {...formItemLayout} >
                    {
                        getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入货架编号！' }],
                            initialValue:shelfData.code
                        })(<Input type="text" placeholder='请输入货架编号' />)
                    }
                </Form.Item>
                <Form.Item label='货架名称' {...formItemLayout} >
                    {
                        getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入货架名称！' }],
                            initialValue:shelfData.name
                        })(<Input type="text" placeholder='请输入货架名称' />)
                    }
                </Form.Item>
                 <Form.Item label='备注信息' {...formItemLayout} >
                    {
                        getFieldDecorator('note', {
                            rules: [{ required: false,}],
                            initialValue:shelfData.note
                        })(<Input type="text" placeholder='请输入备注信息' />)
                    }
                </Form.Item>
                <Form.Item label='是否启用' {...formItemLayout} >
                    {
                        getFieldDecorator('status', {
                            rules: [{ required: false}],
                            initialValue:shelfData.status
                        })( <Checkbox defaultChecked={true}  onChange={(e)=> console.log(e.target.checked) }>启用</Checkbox>)
                    }
                </Form.Item>
                <Form.Item {...formItemLayout} className="text-center">
                    <Button style={{width:120}} htmlType="submit" disabled={this.hasErrors(getFieldsError())} >确认保存</Button>
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

