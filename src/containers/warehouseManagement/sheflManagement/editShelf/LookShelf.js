import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button,Row,Col,massage} from 'antd';

import * as breadActions from '../../../../actions/breadActions';
import * as cont from '../../../../config/constant';

class LookShelf extends Component {
    constructor(props){
        super(props)
        this.state ={
            shelfId:props.match.params.sId,
            salverList:[],
        }
        this.columns = [
            {
                title: '仓位编号',
                dataIndex: 'code',
            },{
                title: '仓位名称',
                dataIndex: 'name',
            },{
                title: '仓位类型',
                dataIndex: 'type',
            },{
                title: '备注',
                dataIndex: 'note',
                key:'note'
            },
        ];
    }
    
    componentWillMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓库管理','我的仓库','货架管理','查看详情']));
        this.getSalverList(this.props.match.params.sId);
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
            salverList:data
        })
    }

    render(){
        const { salverList } = this.state;
        let Off = false;
        let note = '我是一些对此货架的备注信息~~~~~~~~~~~~~~';
        return(
            <div>
                <Row className="mb-10">
                    <Col span={5}>
                           <h4>{'货架编号 : ' +  salverList.shelf.code}</h4>   
                    </Col>
                    <Col span={5}>
                           <h4>{'货架名称 : ' +  salverList.shelf.name}</h4>   
                    </Col>
                    <Col span={5}>
                           <h4>{'货架状态 : ' +  salverList.shelf.status}</h4>   
                    </Col>
                    <Col span={9} className="text-right">
                        <Button onClick={()=>{this.props.history.go(-1)}} type="primary">返回</Button>
                    </Col>
                </Row> 
                <Table bordered dataSource={salverList.cargospaceList} columns={this.columns} pagination={false} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(LookShelf);