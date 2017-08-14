import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input,Cascader,AutoComplete,InputNumber} from 'antd';
import * as warehouseLayoutAction from '../../../actions/warehouseLayout/warehouseLayoutAction';
import * as cont from '../../../config/constant';



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


    //商品名称
class EditableName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsName:'',
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
            arr.push(data[i].goodsName);
        }
        return arr;
    }
    NameChange(value,num){
         if(!value){return ;}
        var reg=new RegExp(value);
        let arr=this.initDataSource();
            arr=arr.filter((item,index)=>{
            return reg.test(item);
        });
        //根据商品名获取商品
        let goods = [];
        let p = {'name':value}
        fetch(cont.getURL(cont.findGoodsListByNameUrl),{
            method:'post',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:cont.getPostParams(p)
            }).then( (response) =>response.json()).then( (data) => {
                goods.push(data);
            }).catch((err) => {
                console.log(err);
            });
        let obj={};
        ary.forEach((item)=>{
            if(!obj[item.goodsxName]){
                obj[item.goodsxName]=[];
            }
            obj[item.goodsxName]=item.sxValueList;
        });
        let data=[],children=[];
        for(let key in obj){
            if(children.length==0){
                obj[key].forEach((item)=>{
                    let tempObj={};
                    tempObj.value=item.value;
                    tempObj.label=item.value;
                    tempObj.children=[];
                    children.push(tempObj);
                })
            }else{
                let tempAry=[];
                obj[key].forEach((item)=>{
                    let tempObj={};
                    tempObj.value=item.value;
                    tempObj.label=item.value;
                    tempObj.children=[];
                    tempAry.push(tempObj);
                })
                children.forEach((item)=>{
                    item.children=tempAry;
                })
                data=data.concat(children);
                console.log(data,children);
                children=tempAry;
            }
        }
        data=data.slice(0,ary[0].sxValueList.length);
        console.log(data,obj);
        options=data;
        this.props.goodsList[num]={
            key:num,
            XS:true,
            goodsName:value
        };
        this.setState({optionData:arr,goodsName:value,});
    }
    onSelect(index,value,num){
        let number = value.split('/')[0];
        let o = {};
        this.props.dataSource.forEach(function(element) {
            if(number == element.goodsNo){
                o = element;
                return
            }
        }, this);
        this.props.goodsList[num]={
          key:num,
          XS:true,
        goodsName:value
        };
        let dispatch = this.props.dispatch;
        dispatch(warehouseLayoutAction.editTrAction(index,o));
    }
    render() {
        let {text,record,index} = this.props;
        return (
            <div className="editable-cell">
                <div className="editable-cell-input-wrapper">
                    <AutoComplete
                        value={this.props.goodsList[index].goodsName||this.state.goodsName} // 默认值
                        style={{ width: 160 }}
                        dropdownMatchSelectWidth={false} // 下拉选择框宽度不随父级
                        dataSource={this.state.optionData} // 数据源
                        placeholder="输入商品名称"
                        allowClear={true} //支持清除, 单选模式有效
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onSelect={(value)=> this.onSelect(index,value,this.props.index)} //选择回调
                        onChange={(value)=>{this.NameChange(value,this.props.index)}}
                    />
                </div>
            </div>
        );
    }
}





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
                title: '商品编号',
                dataIndex: 'goodsNo',
                width:'18%',
                render: (text, record, index) => (
                    <Input onPressEnter={e=> console.log(e.target.value)} placeholder="请输入商品编码"/>
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
                render: (text, record, index) => <a onClick={()=>this.onDelete(index)} href="javascript:;">删除</a>,
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