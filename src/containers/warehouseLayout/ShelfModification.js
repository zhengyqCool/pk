import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';
import { Table, Input, Button, Popconfirm,Row,Col,Select} from 'antd';

class ShelfModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelfId:0,
            classifyData:[
                {
                    name:'酒水饮料',
                    id:1
                },{
                    name:'坚果炒货',
                    id:2
                },{
                    name:'休闲食品',
                    id:3
                },
            ]
        }
    }
    componentDidMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓库管理','我的仓库','货架管理','货位管理']));

       this.setState({
            shelfId:this.props.match.params.adid,
        })
    }

    //初始化分类
    initClassify(){
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
    }
    
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Shelf classifyData={this.state.classifyData}/>
            </div>
        );
    }
}

//新建货架
class Shelf extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataSource: [{
                key: '0',
                name: 'Edward King 0',
                age: '32',
                address: 'London, Park Lane no. 0',
            }],
            count: 1,
        }

        this.classifyOption = props.classifyData.map((o,index)=> (<Select.Option key={index} value={o.name}>{o.name}</Select.Option>) )
        this.columns = [
            {
                title: '仓位编码',
                dataIndex: 'stockNo',
                render: (text, record, index) => (
                        <Input placeholder="请输入货位编号" onChange={(e)=> console.log(e.target.value)}/>
                ),
            },
            {
                title: '仓位类型',
                dataIndex: 'stockType',
                render:(ext, record, index)=> (
                    <Select style={{width:200}} placeholder="请选择货位类型" allowClear={true}>
                        <Select.Option value="储存位">储存位</Select.Option>
                        <Select.Option value="出货位">出货位</Select.Option>
                    </Select>
                )
            },
            {
                    title: '仓位分类',
                dataIndex: 'stockClassify',
                render:(ext, record, index)=> (
                    <Select showSearch={true} style={{width:200}} placeholder="请选择货位分类" allowClear={true}>
                         {this.classifyOption}
                    </Select>
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (this.state.dataSource.length > 1 ?
                            <a href="javascript:;"  onClick={() => this.onDelete(index)} >删除</a> 
                            : 
                            null
                    );
                },
            }
        ];

    }
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    
    render(){
        let { dataSource } = this.state;
        let columns = this.columns;
        return(
             <div> 
                <Row>
                    <Col span={6}>
                         <h4>{'货架编号 : '}</h4>
                    </Col>
                    <Col span={18} className="textRight">
                        <Button className="editable-add-btn" onClick={this.handleAdd}>增加仓位</Button>
                    </Col>
                </Row>
                <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
                <div style={{textAlign:'center',marginTop:10}}>
                    <Button style={{width:150}} type="primary">保存</Button>
                </div>
            </div>
        )
    }
}


//查看详情
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
                        note:'我是备注，你想怎样？'
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

    render(){
        let columns = this.columns;
        let { stockList,shelfNo } = this.state.dataSource

        let Off = false;
        let note = '我是一些对此货架的备注信息~~~~~~~~~~~~~~'
        return(
            <div>
                <Row>
                    <Col span={4}>
                        <h4 style={{marginBottom:10}}>{'仓库编号 : ' + shelfNo}</h4>
                    </Col>
                    <Col span={4}>
                        <h4 style={{marginBottom:10}}>{'货架编号 : ' + shelfNo}</h4>
                    </Col>
                    <Col span={4}>
                        <h4 style={{marginBottom:10}}>{'状态 : ' + (Off?'开启':'关闭')}</h4>
                    </Col>
                    <Col span={12}>
                        <h4 style={{marginBottom:10}}>{'备注信息 : ' + note}</h4>
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

export default connect(mapStateToProps)(ShelfModification);