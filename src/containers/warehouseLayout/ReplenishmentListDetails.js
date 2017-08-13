import React, { Component } from 'react';
import '../../css/palletReplenishment.css'
import { Table,AutoComplete,Cascader,InputNumber,Button,Input,Select,message,Row,Col,Popconfirm} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'
import * as cont from '../../config/constant';

const Option = Select.Option;
class PalletReplenishmentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            warehouseList:{},//仓库列表
            MockData :[],
        }
        this.columns = [
            { 
                title: '商品编码', 
                dataIndex: 'code', 
                width:'15%',
            },{ 
                title: '商品名称', 
                dataIndex: 'name', 
            },{
                title: '规格',
                dataIndex: 'guige',
            },{ 
                title: '单位', 
                dataIndex: 'unit', 
            },{ 
                title: '特征值', 
                dataIndex: 'skudes',
            },{ 
                title: '货架', 
                dataIndex: 'shelf', 
            },{ 
                title: '出货位', 
                dataIndex: 'cargospaces', 
            },{ 
                title: '库存', 
                dataIndex: 'num', 
            },{ 
                title: '已补货', 
                dataIndex: 'supply', 
            }
        ];
    }
    componentWillMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','补货列表','查看详情']));
        this.getGoodsList(this.props.match.params.adid);
    }
    getGoodsList(id){
        // fetch(cont.getURL(cont.replenishmentListUrl),{
        //     method:'POST',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body:cont.getPostParams({
        //         orderId:id,
        //     })
        // }).then(function(response){
        //     return response.json()
        // }).then(function(data){
        //     if(data.code == 0){
                
        //     }else{
        //         message.error(data.errmsg)
        //     }
        // },function(error){
        //     console.log(error);
        // })
        console.log(id);      
           
        let json = [
            {
                goods:{
                    skudes:"蜜茶味-红色-瓶装",
                    sku:"21-20-15",
                    id:3,
                    code:"123",
                    name:"冰红茶",
                    guige:"100ml",
                    unit:"瓶",
                },
                toplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        supply:0,
                        cont:0,
                    }
                ],
                fromplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        surplus:0,
                        sNum:0
                    }
                ]
            },{
                goods:{
                    skudes:"蜜茶味-红色-瓶装",
                    sku:"21-20-15",
                    id:1,
                    code:"123",
                    name:"可口可乐",
                    guige:"100ml",
                    unit:"瓶",
                },
                toplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        supply:0,
                        cont:0,
                    }
                ],
                fromplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        surplus:0,
                        sNum:0
                    }
                ]
            },{
                goods:{
                    skudes:"蜜茶味-红色-瓶装",
                    sku:"21-20-15",
                    id:2,
                    code:"123",
                    name:"美汁源",
                    guige:"100ml",
                    unit:"瓶",
                },
                toplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"1#货位",
                        num:30,
                        supply:0,
                        cont:0,
                    },{
                        shelf:"2#货架",
                        cargospaces:"2#货位",
                        num:30,
                        supply:0,
                        cont:0,
                    }
                ],
                fromplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"1#货位",
                        num:30,
                        surplus:0,
                        sNum:0
                    }
                ]
            }
        ]

        let arr = [];
        json.forEach(obj=>{
            obj.toplace.forEach(el=>{
                let o ={};
                obj.fromplace.forEach((v,i)=>{
                    v.key = i
                })
                o.code = obj.goods.code;
                o.name = obj.goods.name;
                o.guige = obj.goods.guige;
                o.unit = obj.goods.unit;
                o.id = obj.goods.id;
                o.sku = obj.goods.sku;
                o.skudes = obj.goods.skudes;
                o.shelf = el.shelf;
                o.cargospaces = el.cargospaces;
                o.num = el.num;
                o.supply = el.supply;
                o.cont = el.cont;
                o.fromplace = obj.fromplace;
                arr.push(o);
            })
        })
        arr.forEach((obj,index)=>{
            obj.key = index;
        })
        console.log(arr);
       
        const { MockData } = this.state;
    
        this.setState({ MockData:arr})
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
    subtract(a,b){ //补货量不能大于当前储存位库存
        if( (a - b) <= 0 ){
            return 0;
        }else{
            return a - b;
        }
    }
 
    render() {  
        const { MockData } = this.state;
        return (
            <div>
                <Row className="mb-10">
                    <Col span={6}>
                        <h4>补货单号 : {'34312315542'}</h4>
                    </Col>
                    <Col span={6}>
                        <h4>仓库名称 : {'3#仓库'}</h4>
                    </Col>
                    <Col span={12} className="text-right">
                        <Button onClick={()=>{this.props.history.go(-1)}} >返回</Button>
                    </Col>
                </Row>
                <Table
                    columns={this.columns}
                    dataSource={MockData}
                    pagination={false}
                    defaultExpandAllRows={true} 
                    expandedRowRender={(record,index)=> {
                        return(
                            <StockpileSalver
                                dataSource={MockData[index].fromplace}
                                replenishment={this.replenishment}
                            />
                        )
                    }}
                />
            </div>
        )
    }
}
//储存位列表
class StockpileSalver extends Component{
    constructor(props){
        super(props)
        this.columns = [{
            title: '货架',
            dataIndex: 'shelf',
        }, {
            title: '储存位',
            dataIndex: 'cargospaces',
        }, {
            title: '补货数量', 
            dataIndex: 'sNum', 
        },{
            title: '库存余量',
            dataIndex: 'surplus',
        },{
            title: '库存',
            dataIndex: 'num',
        }];
    }

    render(){
        const { dataSource } = this.props;
        return(
            <Table  columns={this.columns} dataSource={dataSource} pagination={false} />
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(PalletReplenishmentDetails);

