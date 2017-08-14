import React, { Component } from 'react';
import '../../css/palletReplenishment.css'
import { Table,AutoComplete,Cascader,InputNumber,Button,Input,Select,message,Row,Col,Popconfirm} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'
import * as cont from '../../config/constant';

const Option = Select.Option;

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
            warehouseList:[],//仓库列表
            warehouseName:'',//仓库名称
            MockData :[],
            cont:0
        }
        this.columns = [
            { 
                title: '商品编码', 
                dataIndex: 'code', 
                width:'15%',
                render:(text,record,index)=>{
                    return(
                        <Input disabled={(typeof record.code === 'undefined')?false:true} defaultValue={text} onChange={(e)=>this.handleOnChange(e.target.value,index,'goodsNo')} onPressEnter={()=> this.getGoodsItem(text,index)} placeholder="请输入商品编号" />
                    )
                }
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
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => <a onClick={this.onDelete.bind(this,index)} href="javascript:;">删除</a>
            }
        ];
    }
    componentWillMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓内操作','补货列表','手动补货']));
        this.getWarehouse();
        
        if(this.props.match.params.adid > 0){ //如果是编辑传入补货单号进行补货
            this.initGoodsList(this.props.match.params.adid);
        }
    }

    initGoodsList(id){
        // fetch(cont.getURL(cont.shiftgoodsOrderDetailUrl),{
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
        //     if(data.code == 0){

        //     }else{
        //         message.error(data.errmsg)
        //     }
        // },function(error){
        //     console.log(error);
        // })

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
                    }
                ],
                fromplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        surplus:30,
                        sNum:0
                    }, {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        surplus:25,
                        sNum:5
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
                    }
                ],
                fromplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"2#货位",
                        num:30,
                        surplus:30,
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
                        supply:4,
                    },{
                        shelf:"2#货架",
                        cargospaces:"2#货位",
                        num:30,
                        supply:3,
                    },{
                        shelf:"2#货架",
                        cargospaces:"2#货位",
                        num:30,
                        supply:3,
                    }
                ],
                fromplace:[
                    {
                        shelf:"1#货架",
                        cargospaces:"1#货位",
                        num:30,
                        surplus:12,
                        sNum:10
                    }
                ]
            }
        ]
        

        let arr = [];
        json.forEach(obj=>{
            obj.toplace.forEach(el=>{
                let o = {};
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
                o.fromplace = obj.fromplace;
                arr.push(o);
            })
        })

        arr.forEach((obj,index)=>{
            obj.key = index;
            let arr2 = [];
            obj.fromplace.forEach(el=>{
                let o = {};
                Object.keys(el).forEach(item=>{
                    o[item] = el[item];
                })
                o.goodsid = obj.id;
                o.indexs = index;
                arr2.push(o)
            })
            obj.fromplace = arr2;
        })
       
        const { MockData } = this.state;
        this.setState({ MockData:arr})
    }

    getWarehouse(){
         // fetch(cont.getURL(cont.replenishmentListUrl).then(function(response){
        //         return response.json()
        //     }).then(function(data){
        //         if(data.code == 0){
                    
        //         }else{
        //             message.error(data.errmsg)
        //         }
        //     },function(error){
        //         console.log(error);
        //     })

        let data = [{
            key: '1',
            code: '001',
            name:'1#仓库',
            createTime:'2017-08-08',
            address: '大学科技园',
            operator:'张颂',
            status:false,
            id:1
        },{
            key: '2',
            code: '002',
            name:'2#仓库',
            address: '大学科技园',
            createTime:'2017-08-08',
            operator:'张颂',
            status:true,
            id:2
        },{
            key: '3',
            code: '003',
            name:'3#仓库',
            address: '大学科技园',
            createTime:'2017-08-08',
            operator:'张颂',
            status:false,
            id:2
        }]
        this.setState({ warehouseList:data })
    }

    handleOnChange(value,index,key){
        const { MockData } = this.state;
        
        if(typeof MockData[index][key] === 'undefined'){
            MockData[index][key] = key;
        }
        Object.keys(MockData[index]).forEach((item) => {
            if(item == key){
                MockData[index][item] = value;
            }
        });
        this.setState({ MockData })

    }

    getGoodsItem(goodsNo,idx){
        const { MockData,warehouseName } = this.state;
        if(!warehouseName){
             message.error('请选择仓库！');
             return
        }
        // fetch(cont.getURL(cont.replenishmentListUrl),{
        //     method:'POST',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body:cont.getPostParams({
        //         repository:this.state.warehouseName,
        //         barcode:goodsNo,
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

        let data = {
            code:0,
            goods:{
                code:'123',
                name:'冰红茶',
                guige:'100ml',
                unit:'瓶',
                skudes:'蜜茶味-红色-瓶装',
                sku:'21-20-15',
                id:12
            },
            fromplace:[
                {
                    shelf:'1#货架',
                    cargospaces:'2#货位',
                    num:30,
                 }, {
                    shelf:'1#货架',
                    cargospaces:'2#货位',
                    num:30,
                }, {
                    shelf:'1#货架',
                    cargospaces:'4#货位',
                    num:20,
                },{
                    shelf:'3#货架',
                    cargospaces:'5#货位',
                    num:80,
                },
            ],
            toplace:[
                {
                    shelf:'1#货架',
                    cargospaces:'2#货位',
                    num:30,
                }, {
                    shelf:'1#货架',
                    cargospaces:'4#货位',
                    num:20,
                },{
                    shelf:'3#货架',
                    cargospaces:'5#货位',
                    num:80,
                },
            ]
        }
       
        let num = this.state.cont;
        let goodsList = data.toplace;
        let fromplace = data.fromplace;
        let goods = data.goods;

        fromplace.forEach((value,index)=>{
            value.key = index;//赋 key 值
            value.surplus = value.num; //添加剩余库存计数字段
            value.goodsid = goods.id;
        })
        goodsList.forEach((currentValue,index)=> {
            num++; //控制 key 值
            Object.keys(goods).forEach((item)=>{
                currentValue[item] = goods[item]; // 将goods 和 toplace  进行合并
                currentValue.key = num; //赋 key 值
            });
            
            let arr = [];
            for(let i = 0; i < fromplace.length; i++){
                let o = {};
                Object.keys(fromplace[i]).forEach((item)=>{
                    o[item] = fromplace[i][item]
                });
                o.indexs = currentValue.key;
                arr.push(o);
            }
           
            currentValue.fromplace = arr; //将出货位列表添加到 goodsList 中
            currentValue.supply = 0; // 添加已补货计数字段
        })
        console.log(goodsList);
        MockData.splice(idx,1,...goodsList); //叫后台返回的商品数据 和 当前的合并
        this.setState({ MockData,cont:num})
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

    replenishment = (value,record,index)=> { //补货数量~
        if(value > (record.sNum + record.surplus)){
            value = (record.sNum + record.surplus);
        }
        let { MockData } = this.state;
        let n1 = 0;//将当前商品出货位所对应的每个储存位所补数量记录下来。
        let n2 = 0;// 将当前商品所有储存位的补货数量记录下来。
        MockData.forEach((el,i)=>{
            if(el.id == record.goodsid){
                if(el.key == record.indexs){
                     el.fromplace[index].sNum = value;
                     el.fromplace.forEach((v,j)=>{

                         if(typeof v.sNum === 'undefined'){
                             v.sNum = 0;
                         }
                         n1 += v.sNum;
                     })
                     el.supply = n1;
                }
                let n3 = 0;
                el.fromplace.forEach((d,x)=>{
                    if(typeof d.sNum === 'undefined'){
                         d.sNum =0;
                    }
                    if(x == index){
                       n3 = d.sNum;
                    }
                })
                n2 += n3;
            }
        })

        MockData.forEach((el,i)=>{
            if(el.id == record.goodsid){
                let n4 = el.fromplace[index].num; //当前储存位的库存 
                el.fromplace[index].surplus = this.subtract(parseInt(n4), parseInt(n2));
            }
        })
        this.setState({ MockData });
    }

    subtract(a,b){ //补货量不能大于当前储存位库存
        if( (a - b) <= 0 ){
            return 0;
        }else{
            return a - b;
        }
    }

    handleAdd = () => { //增加一行
        let { MockData,cont } = this.state;
        let newData = { key:cont + 1};
        this.setState({
            MockData: [...MockData, newData],
            cont:cont + 1
        });
        
    }

    onDelete(idx){ //删除
        const { MockData } = this.state;
        
        MockData.splice(idx, 1);
        
        this.setState({ MockData });
    }

    confirm(way){
        // console.log(this.state.MockData);
        const { MockData,warehouseName } = this.state;
        if(!warehouseName){
             message.error('请选择仓库！');
            return;
        }
        let Off = false; // 判断是否选有商品
            let arr = [];
            if(MockData.length > 0){
                MockData.forEach((obj)=>{
                    if(typeof obj.id !== 'undefined'){
                        Off = true;
                    }
                })
            }
            if(Off){
                 MockData.forEach( (obj,index)=>{
                    obj.fromplace.forEach((el,i)=>{
                        if((typeof el.sNum !== 'undefined') &&  el.sNum !== 0){
                            let o = {};
                            o.barcode = obj.code;
                            o.goodsId = obj.id;
                            o.sku = obj.sku;
                            o.toShelf = obj.shelf;
                            o.toCargospace = obj.cargospaces;
                            o.fromShelf = el.shelf;
                            o.fromCargospace = el.cargospaces;
                            o.num = el.sNum;
                            arr.push(o);
                            o.fromRepository = warehouseName;
                            o.toRepository = warehouseName;
                        }
                    })
                })

                let url = ''; //提交补货单
                if(way === 'commit'){
                    url = cont.doReplenishmentUrl;//提价补货单
                }else if(way === 'finish'){
                    url = cont.finishReplenishmentUrl;//完成并更新库存
                }else{
                    url = cont.autoReplenishmentByImpermanentUrl;//保存补货单
                }
                console.log(way);
                
                // fetch(cont.getURL(url),{
                //     method:'POST',
                //     headers:{
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body:cont.getPostParams({
                //         goodsList:arr,
                //         // orderno:'',
                //     })
                // }).then(function(response){
                //     return response.json()
                // }).then(function(data){
                //     if(data.code == 0){
                //          message.success(data.msg,1,()=>{
                //              this.props.history.go(-1)
                //          });
                //         MockData.splice(0,MockData.length); 
                //         this.setState({ MockData })
                        
                //     }else{
                //         message.error(data.errmsg)
                //     }
                // },function(error){
                //     console.log(error);
                // })
            }else{
                 message.error('请选择商品');
                 return
            }  
            message.success('提交成功',1,()=>{
                this.props.history.go(-1)
            });
            console.log(arr);
            MockData.splice(0,MockData.length); 
            this.setState({ MockData })
        
            // message.error('已提交');
    }
    
    
    // 找出相同的
    unique(arr){ 
        // let result = [], hash = {};
        // for (let i = 0, elem; (elem = arr[i]) != null; i++) { // 高效率写法 ！~
        //     if (!hash[elem]) {
        //         result.push(elem);
        //         hash[elem] = true;
        //     }
        // }
        // return result;

        var result = [], isRepeated;
         for (var i = 0, len = arr.length; i < len; i++) {
             isRepeated = false;
             for (var j = 0, len = result.length; j < len; j++) {
                 if (arr[i].id == result[j].id) {   
                     isRepeated = true;
                     break;
                 }
             }
             if (!isRepeated) {
                 result.push(arr[i]);
             }
         }
         return result;
    }
    render() {
        const warehouseOption = this.state.warehouseList.map((anItem,index)=>(<Select.Option disabled={anItem.status} value={anItem.name + ''} key={anItem.id}>{anItem.name}</Select.Option>))
        const { MockData } = this.state;
        return (
            <div>
                <Row className="mb-10">
                    <Col span={12}>
                        <Select placeholder="请选择仓库" style={{ width: 180 }} onSelect={(value)=> {this.setState({warehouseName:value})}} >
                            {warehouseOption}
                        </Select>
                    </Col>
                    <Col span={12} className="text-right" >
                        <Button onClick={this.handleAdd}>增加一行</Button>
                        <Button className="ml-10" type="primary" onClick={()=>{this.props.history.go(-1)}}>返回</Button>
                    </Col>
                </Row>
                <Table
                    columns={this.columns}
                    dataSource={MockData}
                    pagination={false}
                    defaultExpandAllRows={true}
                    onExpandedRowsChange={ ()=> {return} } 
                    defaultExpandedRowKeys={['123','12123123','234234234']}
                    expandedRowRender={(record,index)=> {
                        return(
                            <StockpileSalver
                                dataSource={MockData[index].fromplace}
                                replenishment={this.replenishment}
                            />
                        )
                    }}
                />
                <div className="text-center" style={{marginTop:10}}>
                    <Popconfirm title="完成后将生成补货不可修改，是否提交？" onConfirm={()=> this.confirm('finish')} okText="是" cancelText="否">
                        <Button style={{width:120}}  type="primary">完成并更新库存</Button>
                    </Popconfirm>
                    <Button  onClick={()=> this.confirm('commit')} className="ml-10">提交</Button>
                    <Button onClick={()=> this.confirm('save')} className="ml-10 mr-10">保存</Button>
                    <Button  onClick={this.handleAdd}>增加一行</Button>
                </div>
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
            dataIndex: 'bhNum', 
            render:(text,record,index)=>{
                return(
                    <InputNumber defaultValue={(typeof record.sNum == 'undefined')?0:record.sNum} min={0} max={record.sNum + record.surplus} onChange={(value)=>this.props.replenishment(value,record,index)} />
                )
            }, 
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
export default connect(mapStateToProps)(AddPalletReplenishment);

