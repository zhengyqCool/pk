import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input,Cascader,AutoComplete,InputNumber} from 'antd';
import * as warehouseLayoutAction from '../../../actions/warehouseLayout/warehouseLayoutAction';


//商品编号
class EditableCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionData:[],
        }
    }
    componentDidMount(){
        this.initDataSource();
    }

    initDataSource(){
        
        let data = this.props.dataSource;
        let arr = [];
        for(let i = 0; i < data.length; i++){
            let str = data[i].goodsNo + '/' + data[i].goodsName +'/'+ data[i].goodsNorms +'/'+ data[i].unit+'/'+ data[i].skudes
            arr.push(str);
        }
        this.setState({optionData:arr});
    }
    onSelect(index,value){
        let number = value.split('/')[0];
        let o = {};
        this.props.dataSource.forEach(function(element) {
            if(number == element.goodsNo){
                o = element;
                return
            }
            // console.log(element);
        }, this);
        let dispatch = this.props.dispatch;

        dispatch(warehouseLayoutAction.editTrAction(index,o))
    }
    render() {
        let {text,index} = this.props;
        return (
            <div className="editable-cell">
                <div className="editable-cell-input-wrapper">
                    <AutoComplete
                        value={text}
                        style={{ width: 160 }}
                        dropdownMatchSelectWidth={false} // 下拉选择框宽度不随父级
                        dataSource={this.state.optionData} // 数据源
                        allowClear={true} //支持清除, 单选模式有效
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onSelect={(value)=> this.onSelect(index,value)} //选择回调
                    />
                </div>
            </div>
        );
    }
}

// //商品名称
// class EditableCellGoods extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//     }

//     onChange(value, selectedOptions) {
//         console.log(value, selectedOptions);
//     }
//     componentDidMount(){

//     }   
//     render() {
//         return (
//             <div className="editable-cell">
//                 <div className="editable-cell-input-wrapper">
//                     <Cascader
//                         disabled={this.props.disabled}
//                         options={options}
//                         onChange={(value, selectedOptions)=> this.onChange(value, selectedOptions)}
//                         placeholder="请输入商品名称"
//                         showSearch
//                         notFoundContent='未找到对应的商品！'
//                     />
//                 </div>
//             </div>
//         );
//     }
// }


//货架数据
const shelfOptions = [
        {
            value: '1#货架',
            label: '1#货架',
            children: [{
                value: '货位1-1',
                label: '货位1-1',
            }, {
                value: '货位1-2',
                label: '货位1-2',
            }],
        },{
            value: '2#货架',
            label: '2#货架',
            children: [{
                value: '货位2-1',
                label: '货位2-1',
            }, {
                value: '货位2-2',
                label: '货位2-2',
            }]
        }
    ];

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandValue:'123',
            dataSource: [],
            count: 1,
        }
        this.columns = [
            {
                title: '商品编号（输入商品编号或名称选择商品）',
                dataIndex: 'goodsNo',
                width:'18%',
                render: (text, record, index) => (
                    <EditableCell
                        dispatch={props.dispatch}
                        index={index}
                        text={text}
                        record={record}
                        dataSource={this.props.goodsDataSource.initData}
                    />
                ),
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName',
            },{
                title: '规格',
                dataIndex: 'goodsNorms',
            },{
                title: '单位',
                dataIndex:'unit',
            },{
                title: '特征值',
                dataIndex: 'skudes',
            },{
                title: '货架/货位',
                dataIndex: 'shelf',
                render:(ext, record, index)=> (
                    <Cascader
                        options={shelfOptions}
                        onChange={(value)=>{console.log(value)}}
                        placeholder="请选择货架"
                        showSearch
                        notFoundContent='未找到对应的货架'
                    />
                )
            },{
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
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        this.props.goodsList.length > 1 ?
                            <a onClick={()=>this.onDelete(index)} href="javascript:;">删除</a>
                            : 
                            null
                    );
                },
            }
        ];
    }
    componentDidMount(){
        let dispatch =  this.props.dispatch;
        dispatch(warehouseLayoutAction.selectGoodsAction())
    }

    booleanshouldComponentUpdate(){
        console.log(this.props);
    }
    onDelete = (index) => {
        let dispatch = this.props.dispatch;
        dispatch(warehouseLayoutAction.deleteTrAction(index))
    }
    render() {
        const columns = this.columns;
        return (
            <div>
                <Table bordered dataSource={this.props.goodsList} columns={columns} pagination={false} />  
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        goodsList:state.selfTable,
        goodsDataSource:state.selectGoods
    }
}

export default connect(mapStateToProps)(EditableTable);