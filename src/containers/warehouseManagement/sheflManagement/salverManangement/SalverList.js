import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button,Row,Col,Select,Popconfirm,message,Modal} from 'antd';

import * as breadActions from '../../../../actions/breadActions';
import * as cont from '../../../../config/constant';

class SalverList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelfData:{},
            shelfId:props.match.params.adid,
            salverList:[],
            count:0,
        }
    }
    componentWillMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓库管理','我的仓库','货架管理','货位管理']));
        
        this.getSalverList(this.props.match.params.adid);
    }

    salverManage(){
        
    }

    getSalverList(id){
        //  fetch(cont.getURL(cont.cargospaceUrl),{
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
        //     if(data !== null || data !== undefined){
        //         if(data.code == 0){
        //             if(data.cargospace !== null && data.cargospace.length > 0){
        //                 this.setState({
        //                     salverList:data.cargospace
        //                 })
        //             }else{
        //                 console.log('cargospaceList is empty')
        //             }
        //         }else{
        //             massage.error(data.errmsg)
        //         }
        //     }
        // },function(error){
        //     console.log(error);
        // })
        const data = {
            shelf:{
                id:'01',
                code:'234134',
                name:'1#货架',
                status:'启用',
            },
            cargospaceList:[{
                id:1,
                code:'355441',
                name:'1#货位',
                shelfId:'01',
                key:'1',
                type:'储存位',
                note:'嗨！楼下的我是备注~明白没？'
            }, {
                id:2,
                code:'355441',
                name:'1#货位',
                shelfId:'01',
                key:'2',
                type:'出货位',
                note:'我也是备注，你想怎样？'
            }
        ]}

        this.setState({
            shelfData:data.shelf,
            salverList:data.cargospaceList,
            count:data.cargospaceList.length
        })
    }

    //增加一行
    handleAdd = () => {
        let { salverList,count } = this.state;
        let newData = {key: count + 1};
        this.setState({
            salverList: [...salverList, newData],
            count:count + 1
        });
    }

    //删除一行
    onDelete = (index,record) => {
        if(typeof record.id === 'undefined'){
            let salverList = [...this.state.salverList];
            salverList.splice(index, 1);
            this.setState({ salverList:salverList });
        }else{
            // fetch(cont.getURL(cont.delcargospaceUrl),{
            //     method:'POST',
            //     headers:{
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body:cont.getPostParams({
                    
            //         code:record.id,
                
            //     })
            // }).then(function(response){
                
            //     return response.json()
            
            // }).then(function(data){
            //     if(data.code == 0){
            //         message.success(data.msg);
            //         let salverList = [...this.state.salverList];
            //         salverList.splice(index, 1);
            //         this.setState({ salverList:salverList });
            //     }else{
            //         message.error(data.errmsg)
            //     }
            // },function(error){
            //     console.log(error);
            // })
        }
        console.log(record);
        let salverList = [...this.state.salverList];
        salverList.splice(index, 1);
        this.setState({ salverList:salverList });
    }
    //错误提示
    ModalErroe(errmsg){
        Modal.error({
            title: '错误提示',
            content: errmsg,
        });
    }

    //编辑
    onEdit = (record,index)=> {
        // if(record.id == undefined){//新增加的
            
        //     let shelfId = this.state.shelfData.id;
        //     let warehousesId = this.props.match.params.adid;
            
        //     fetch(cont.getURL(cont.newcargospaceUrl),{
        //         method:'POST',
        //         headers:{
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body:cont.getPostParams({
        //             code:record.code,
        //             name:record.name,
        //             type:record.type,
        //             shelfId:shelfId,
        //             warehousesId:warehousesId
        //         })
        //     }).then(function(response){
        //         return response.json()
        //     }).then(function(data){
        //         if(data.code == 0){
        //             if(typeof record.code === 'undefined' || record.code === ''){
        //                 this.ModalErroe('请填写正确的货位信息');
        //                 return;
        //             }else if(typeof record.name === 'undefined' || record.name === ''){
        //                 this.ModalErroe('请填写正确的货位信息');
        //                 return;
        //             }else if(typeof record.type === 'undefined' || record.type === ''){
        //                 this.ModalErroe('请填写正确的货位信息');
        //                 return;
        //             }
        //             let { salverList } = this.state;
                    
        //             salverList[index].sign = true //表示保存成功

        //             message.success(data.msg);
        //             this.setState({ salverList })
        //         }else{
        //             message.error(data.errmsg)
        //         }
        //     },function(error){
        //         console.log(error);
        //     })
        // }
        if(typeof record.code === 'undefined' || record.code === ''){
            this.ModalErroe('请填写正确的货位信息');
            return;
        }else if(typeof record.name === 'undefined' || record.name === ''){
            this.ModalErroe('请填写正确的货位信息');
            return;
        }else if(typeof record.type === 'undefined' || record.type === ''){
            this.ModalErroe('请填写正确的货位信息');
            return;
        }
        
        // console.log(typeof record.code === 'undefined' || record.code === '');
        const newSalver = {
            id:2,
            code:record.code,
            name:record.name,
            key:'100',
            type:record.type,
            note:record.note
        }

        let { salverList } = this.state;
    
        salverList.splice(index,1,newSalver);

        console.log(salverList);

        message.success('创建成功');
        this.setState({ salverList })
    }
    handleChange = (index,value,key)=>{
        const { salverList } = this.state;
        if(typeof salverList[index][key] === 'undefined'){
            salverList[index][key] = key;
        }
        Object.keys(salverList[index]).forEach((item) => {
            if(item == key){
                salverList[index][item] = value;
            }
        });
        this.setState({ salverList })
    }   
    
    render() {
        return (
            <div>
                <Row className="mb-10">
                    <Col span={12}>
                        <h4 className="mt-5">{'货架编号 : ' + this.state.shelfData.code}</h4>
                    </Col>
                    <Col span={12} className="text-right">
                        <Button onClick={()=>{this.props.history.go(-1)}} type="primary" style={{marginLeft:10}}>返回</Button>
                    </Col>
                </Row>
                <Salver onChange={this.handleChange} salverList={this.state.salverList} deleteFc={this.onDelete} onEdit={this.onEdit} />
                <div className="text-center mt-10">
                    <Button type="primary" className="editable-add-btn" onClick={this.handleAdd}>增加仓位</Button>
                </div> 
            </div>
        );
    }
}
class Salver extends Component {

    constructor(props){
        super(props)
        this.state={
            toggle:true
        }
        this.columns = [
            {
                title: '货位编码',
                dataIndex: 'code',
                render: (text, record, index) => (
                        <Input placeholder="请输入货位编号" disabled={(typeof record.id !== 'undefined')?true:false} defaultValue={text} onChange={(e)=> props.onChange(index,e.target.value,'code')} />
                ),
            },
            {
                title: '货位名称',
                dataIndex: 'name',
                render:(text, record, index)=> (
                    <Input placeholder="请输入货位名称" disabled={(typeof record.id !== 'undefined')?true:false} defaultValue={text} onChange={(e)=> props.onChange(index,e.target.value,'name')} />
                )
            },
            {
                title: '货位类型',
                dataIndex: 'type',
                render:(text, record, index)=> (
                    <Select
                        disabled={(typeof record.id !== 'undefined')?true:false} 
                        style={{width:200}} 
                        placeholder="请选择货位类型" 
                        defaultValue={text} 
                        onSelect={(value) =>props.onChange(index,value,'type')} 
                    >
                        <Select.Option value="储存位">储存位</Select.Option>
                        <Select.Option value="出货位">出货位</Select.Option>
                    </Select>
                )
            },
            {
                title: '备注信息',
                dataIndex: 'note',
                render:(text, record, index)=> (
                    <Input defaultValue={text} disabled={(typeof record.id !== 'undefined')?true:false} placeholder="请输入备注信息" onChange={(e)=> props.onChange(index,e.target.value,'note')} />
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width:'8%',
                render: (text, record, index) => {
                    return (
                        <div>
                            {(typeof record.id === 'undefined')?
                                <span><a href="javascript:;"  onClick={() => props.onEdit(record,index)} >创建</a> | </span>
                                :
                                null
                            }
                            {this.props.salverList.length > 1 ?
                            <a href="javascript:;"  onClick={() => props.deleteFc(index,record)} >删除</a>
                             : 
                            null}
                        </div>
                    );
                },
            }
        ];

    }
    render(){
        return(
             <div> 
                <Table bordered dataSource={this.props.salverList} columns={this.columns} pagination={false} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(SalverList);