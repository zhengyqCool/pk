import React, { Component } from 'react';
import '../../css/palletReplenishment.css'
import { Table,AutoComplete,Cascader,InputNumber,Button,Input,Row,Col,DatePicker} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'

const {RangePicker } = DatePicker;

class AddAutoReplenishment extends Component {
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
                key:'goodsNo'
            },{ 
                title: '选择商品', 
                dataIndex: 'goodsName', 
                key:'goodsName'
            },{ 
                title: '规格', 
                dataIndex: 'norms', 
                key:'norms'
            },{ 
                title: '单位', 
                dataIndex: 'unit', 
                key:'unit'
            },{ 
                title: '特征值', 
                dataIndex: 'sku', 
                key:'sku'
            },{ 
                title: '货架', 
                dataIndex: 'shelf', 
                key:'shelf' 
            },{ 
                title: '货位', 
                dataIndex: 'salver', 
                key:'salver' 
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


    onDelete = (index) => { //删除
        const dataSource = [...this.state.MockData];
        dataSource.splice(index, 1);
        this.setState({ MockData:dataSource });
    }

    replenishment = (obj,id)=> { //补货数量~
        console.log(obj);
        console.log(id);
    }


    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','补货列表','自动补货']));
    } 
    
    render() {
        return (
            <div>
                <Row className="mb-10">
                    <Col span={12}>
                        <label>选择时间 : </label>
                        <RangePicker onChange={(value)=> console.log(value)} />
                    </Col>
                    <Col span={12} className="text-right">
                        <Button type="primary" onClick={()=>{this.props.history.go(-1)}}>返回</Button>
                    </Col>
                </Row>
                <Table
                    columns={this.columns}
                    expandedRowRender={()=> 
                        <StockpileSalver 
                            dataSource={this.state.salverData}
                            replenishment={this.replenishment}
                        />
                    }
                    dataSource={this.state.MockData}
                />
                <div className="text-center" style={{marginTop:10}}>
                    <Button type="primary" >提交</Button>
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
            <Table rowSelection={rowSelection} columns={this.columns} dataSource={data} pagination={false} />
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(AddAutoReplenishment);

