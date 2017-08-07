import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as breadActions from '../../../../actions/breadActions';
import { Table, Input, Button,Row,Col} from 'antd';

class LookShelf extends Component {
    constructor(props){
        super(props)
        this.state ={
            dataSource:{
                shelfNo:'001',
                stockList:[
                    {
                        key:'1',
                        stockNo:'001-01',
                        stockType:'储存位',
                        note:'嗨！楼下的我是备注~明白没？'
                    },{
                        key:'2',
                        stockNo:'001-02',
                        stockType:'出货位',
                        note:'我也是备注，你想怎样？'
                    },

                ]
            }
        }
        this.columns = [
            {
                title: '仓位编号',
                dataIndex: 'stockNo',
                key:'stockNo'
            },
            {
                title: '仓位类型',
                dataIndex: 'stockType',
                key:'stockType'
            },
            {
                title: '备注',
                dataIndex: 'note',
                key:'note'
            },
        ];
    }

    /*
        componentDidMount(){
            initShelf(this.props.id) // 初始化货架信息
        }
    */

    initShelf(id){
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
    componentDidMount(){
        console.log(this.props);
    }

    render(){
        let columns = this.columns;
        let { stockList,shelfNo } = this.state.dataSource

        let Off = false;
        let note = '我是一些对此货架的备注信息~~~~~~~~~~~~~~'
        return(
            <div>
                <Row style={{marginBottom:10}}>
                    <Col span={3}>
                        <h4 style={{paddingTop:5}}>{'仓库编号 : ' + shelfNo}</h4>
                    </Col>
                    <Col span={3}>
                        <h4 style={{paddingTop:5}}>{'货架编号 : ' + shelfNo}</h4>
                    </Col>
                    <Col span={3}>
                        <h4 style={{paddingTop:5}}>{'状态 : ' + (Off?'开启':'关闭')}</h4>
                    </Col>
                    <Col span={12}>
                        <h4 style={{paddingTop:5}}>{'备注信息 : ' + note}</h4>
                    </Col>
                    <Col span={3} style={{textAlign:"right"}}>
                        <Button onClick={()=>{this.props.history.go(-1)}} type="primary">返回</Button>
                    </Col>
                </Row> 
                <Table bordered dataSource={stockList} columns={columns} pagination={false} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(LookShelf);