import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Popconfirm,Cascader,InputNumber} from 'antd';
import * as warehouseLayoutAction from '../../../actions/warehouseLayout/warehouseLayoutAction';

import * as cont from '../../../config/constant'

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salver:[]

        }
        this.columns = [
            {
                title: '商品编号',
                dataIndex: 'code',
                key:'code'
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                key:'goodsName'
            },
            {
                title: '规格',
                dataIndex: 'guige',
                 key:'guige'
            },
            {
                title: '特征值',
                dataIndex: 'skudes',
                key:'skudes'
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key:'unit'
            },
            {
                title: '货架/货位',
                dataIndex: 'shelf',
                render:(ext, record, index)=> (
                    <Cascader
                        style={{width:'100%'}}
                        options={this.props.dataSource[index].shelf}
                        onChange={(value, selectedOptions)=> this.onChange(selectedOptions)}
                        placeholder="请选择货架"
                        showSearch
                        notFoundContent='未找到对应的货架'
                    />
                )
            },
            {
                title: '数量',
                dataIndex: 'goodsNum',
                render:(ext, record, index)=> (
                    <InputNumber min={1} max={100000} defaultValue={0} onChange={(e)=> console.log(e)} />
                )
            },
            {
                title: '备注',
                dataIndex: 'note',
                render:(ext, record, index)=> (
                    <Input placeholder="请输入备注" onPressEnter={this.handleAdd}/>
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        this.props.dataSource.length > 1 ?
                        <Popconfirm okText="确定" cancelText="取消"  title="确认要删除此商品？" onConfirm={() => this.onDelete(index)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        : 
                        null
                    );
                },
            }
        ];
    }
    componentDidMount(){
    }

    booleanshouldComponentUpdate(){
        console.log(this.props);
    }

    onDelete = (index) => {
        let dispatch = this.props.dispatch;
        dispatch(warehouseLayoutAction.deleteTrAction(index))
    }

    onChange(item){ //选择货架
        fetch(cont.getURL(cont.aaa1url))
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
        console.log(item)
        let data = [
            {
                value: '1#货位',
                label: '1#货位',
                id:'01'
            },{
                value: '2#货位',
                label: '2#货位',
                id:'02'
            }
        ];
        
        this.setState({
            salver:data
        })
    }

    dispose(arr){//商品列表处理
        let _arr = [];
        arr.forEach(function(element) {
            _arr.push(element.goods)
        }, this);
        return _arr;
    }

    render() {
        let goodsList = this.dispose(this.props.dataSource);//商品列表处理
        
        return (
            <div>
                <Table bordered dataSource={goodsList} columns={this.columns} pagination={false} />  
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        dataSource:state.autoSelfTable,
    }
}

export default connect(mapStateToProps)(EditableTable);