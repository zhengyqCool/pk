import React, { Component } from 'react';
import '../../css/palletReplenishment.css'
import { Table,AutoComplete,Cascader,InputNumber,Button,Input} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'

//仓位联动
const salverOptions = [{
    value: '1#货架',
    label: '1#货架',
    children: [{
        value: '1#仓位',
        label: '1#仓位',
    },{
        value: '2#仓位',
        label: '2#仓位',
    },{
        value: '3#仓位',
        label: '3#仓位',
    }],
}, {
    value: '2#货架',
    label: '2#货架',
    children: [{
        value: '1#仓位',
        label: '1#仓位',
    },{
        value: '2#仓位',
        label: '2#仓位',
    },{
        value: '3#仓位',
        label: '3#仓位',
    }],
}];

const normsOptions = [{
    value: '桶装',
    label: '桶装',
    children:[{
        value:'麻辣味',
        label:'麻辣味',
    },
    {
        value:'五香味',
        label:'五香味',
    }]
}, {
    value: '袋装',
    label: '袋装',
    children:[{
        value:'红烧味',
        label:'红烧味',
    },
    {
        value:'酸菜味',
        label:'酸菜味',
    }]
}];
class AddPalletReplenishment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            salverData:[], // 商品编码
            MockData :[{ 
                    key: 1,
                }
            ]
        }
        this.columns = [
            { 
                title: '商品编码', 
                dataIndex: 'goodsNo', 
                width:'20%',
                render:(text,record,index)=>{
                    return(
                        <EditableCell onSelect={this.getGoodsNo}/>
                    )
                }
            },{ 
                title: '选择商品', 
                dataIndex: 'sGoods', 
            },{
                title: '品牌',
                dataIndex: 'brand',
            },{ 
                title: '规格', 
                dataIndex: 'norms', 
            },{ 
                title: '特征值', 
                dataIndex: 'sku', 
            },{ 
                title: '选择货位', 
                dataIndex: 'sSalver', 
                render:(text,record,index)=>{
                    return(
                        <Cascader
                            options={salverOptions}
                            onChange={(value, selectedOptions)=> console.log(value, selectedOptions)}
                            placeholder="请选择货位"
                            showSearch
                            notFoundContent="未找到相应货位"
                        />
                    )
                } 
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                    this.state.MockData.length > 1 ?
                        <a onClick={this.onDelete} href="javascript:;">删除</a>
                        : 
                        null
                    );
                }
            }
        ];
    }

    getGoodsNo = (value)=> {//选择商品编码
        console.log(value);
        let salverData = [{ // 根据选择中的商品编码、返回此商品所在的储存位data
            key:'01',
            salverNo:'654',
            salverType:'储存位',
            repertory:'60'
        }]
        if(value == undefined || value == null){
            salverData.length = 0
        }
       
        this.setState({
            salverData:salverData
        })
    }

    onDelete = (index) => { //删除
        const dataSource = [...this.state.MockData];
        dataSource.splice(index, 1);
        this.setState({ MockData:dataSource });
    }

    replenishment = (obj,id)=> { //补货数量~
        console.log(obj);
        console.log(id);
    }

    handleAdd = () => { //增加一行
        const MockData = this.state.MockData;
        const newData = {
            key: MockData.length + 1,
        };
        this.setState({
            MockData: [...MockData, newData],
        });
    }

    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','补货列表','手动补货']));
    } 
    
    render() {
        return (
            <div>
                <div className="text-right" style={{marginBottom:10}}>
                    <Button onClick={this.handleAdd}>增加一行</Button>
                    <Button className="ml-10" type="primary" onClick={()=>{this.props.history.go(-1)}}>返回</Button>
                </div>
                <Table
                    columns={this.columns}
                    expandedRowRender={()=> 
                        <StockpileSalver 
                            dataSource={this.state.salverData}
                            replenishment={this.replenishment}
                        />
                    }
                    dataSource={this.state.MockData}
                    pagination={false}
                />
                <div className="text-center" style={{marginTop:10}}>
                    <Button  type="primary">提交</Button>
                    <Button className="ml-10">保存</Button>
                </div>
            </div>
        )
    }
}
//储存位列表
class StockpileSalver extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
        }
        this.columns = [{
            title: '仓位编号',
            dataIndex: 'salverNo',
        }, {
            title: '仓位类型',
            dataIndex: 'salverType',
        }, {
            title: '补货数量', 
            dataIndex: 'num', 
            render:(text,record,index)=>{
                return(
                    <InputNumber defaultValue={0} min={0} onChange={(value)=>this.props.replenishment(record,value)} />
                )
            }, 
        },{
            title: '库存量',
            dataIndex: 'repertory',
        }];

        this.data = [
            {
                key:'01',
                salverNo:'654',
                salverType:'储存位',
                repertory:'60'
            }
        ];
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        const data = this.props.dataSource
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <Table  rowSelection={rowSelection} columns={this.columns} dataSource={data} pagination={false} />
        )
    }
}

//商品编号
class EditableCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            optionData:[],
        }
    }
    componentDidMount(){
        this.initDataSource();
    }

    initDataSource(){
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
        
        const data = [
            {
                goodsNo:'111',
                name:'冰红茶',
                norms:'300ml',
                tzz:'柚子味',
                brand:'康师傅',
                id:'01'
            },
            {
                goodsNo:'222',
                name:'绿茶',
                norms:'300ml',
                tzz:'水蜜桃',
                brand:'统一',
                id:'02'
            },
        ]
        let arr = [];
        for(let i = 0; i < data.length; i++){
            let str = data[i].goodsNo + '/' + data[i].name +'/'+ data[i].norms +'/'+ data[i].tzz +'/'+data[i].brand;
            arr.push(str);
        }
        this.setState({optionData:arr});
    }
    render() {
        return (
            <div className="editable-cell">
                <div className="editable-cell-input-wrapper">
                    <AutoComplete
                        style={{ width: 180 }}
                        dropdownMatchSelectWidth={false}
                        dataSource={this.state.optionData}
                        placeholder="请输入商品编号"
                        allowClear={true}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value)=> this.props.onSelect(value)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(AddPalletReplenishment);

