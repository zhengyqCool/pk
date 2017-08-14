import React, { Component } from 'react';
import '../../css/palletReplenishment.css'
import { Table,AutoComplete,Cascader,InputNumber,Button,Input,Select,message,Row,Col,Popconfirm} from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'
import * as cont from '../../config/constant';

const Option = Select.Option;

let time;
class AddGoodsWarehousing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            warehouseList:[],//仓库列表
            warehouseName:'',//仓库名称
            dataSource:[],//入库商品数据源
            shelfDateSource:[], //选择货架
            goodsList:[],// 输入商品名称  选中商品
            goodsNameValue:'',
            cont:0,
        }
        this.columns = [
            { 
                title: '商品编码', 
                dataIndex: 'code', 
                width:'10%',
                render:(text,record,index)=>{
                    return(
                        <Input disabled={(typeof record.code === 'undefined')?false:true} defaultValue={text} onChange={(e)=>this.handleOnChange(e.target.value,index,'goodsNo')} onPressEnter={()=> this.getGoodsItem(text,index)} placeholder="请输入商品编号" />
                    )
                }
            },{ 
                title: '商品名称', 
                dataIndex: 'name', 
                width:'18%',
                render:(text,record,index)=>{
                    return( 
                        <AutoComplete
                            value={ this.state.dataSource[index].name} 
                            style={{ width: 230 }}
                            dataSource={this.state.goodsList}
                            placeholder="输入商品名称选择商品"
                            disabled={(typeof record.code === 'undefined')?false:true}
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            onChange={(value)=>this.selectGoods(value,index)}
                        />
                    )
                }   
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
                title: '出货位', 
                dataIndex: 'shelf',
                width:'15%',
                render:(text,item,index)=>{
                    return(
                        <Cascader options={this.state.dataSource[index].shelfDateSource} onChange={(value)=> console.log(value)} placeholder="选择货架货位" />
                    )
                } 
            },{ 
                title: '数量', 
                width:'10%',
                render:(text,record,index)=>{
                    return(
                        <InputNumber defaultValue={0} min={0} onChange={(value)=>console.log(value)} />
                    )
                } 

            },{ 
                title: '库存', 
                dataIndex: 'inventory', 
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

         console.log(this.state.goodsList);
    }
    getWarehouse(){
        // fetch(cont.getURL(cont.bccc),{
        //     method:'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        // // body:cont.getPostParams(p)
        // }).then( (response) =>response.json()).then( (data) => {
        //     if (data.code == 0) {
        //         history.goBack(-1);
        //     }else if(data.code == 1) {
        //         message.error('保存失败！',3);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })   

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

    selectGoods(value,index){
        const { dataSource } = this.state;
        dataSource[index].name = value;
        if(time) clearTimeout(time); //Debouncing 处理
        time = setTimeout(()=>{
            // fetch(cont.getURL(url),{
            //     method:'POST',
            //     headers:{
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body:cont.getPostParams({
            //         goodsName:value,
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

            const data = [
                {
                    name:'冰红茶1',
                    goodsId:1,
                    guige:'100ml',
                    unit:'瓶'
                },{
                    name:'冰红茶2',
                    goodsId:2,
                    guige:'100ml',
                    unit:'瓶'
                },{
                    name:'冰红茶3',
                    goodsId:3,
                    guige:'100ml',
                    unit:'瓶'
                },{
                    name:'冰红茶4',
                    goodsId:4,
                    guige:'100ml',
                    unit:'瓶'
                },{
                    name:'冰红茶5',
                    goodsId:5,
                    guige:'100ml',
                    unit:'瓶'
                },
            ]
            
            let arr = [];
            data.forEach((obj,index)=>{
                obj.key = index;
                let str = obj.name;
                arr.push(str);
            })
            this.setState({
                goodsList:arr,
                goodsNameValue:value,
                dataSource
            })
        },300);
    }
    
    handleSelect(value,index){
        const { dataSource } = this.state;
        let arr = [];
        if(value !== null){
            arr = value.split('/');
        }
        dataSource[index].name = arr[0]
        this.setState({ dataSource });
    }

    handleOnChange(value,index,key){
        const { dataSource } = this.state;
        
        if(typeof dataSource[index][key] === 'undefined'){
            dataSource[index][key] = key;
        }
        Object.keys(dataSource[index]).forEach((item) => {
            if(item == key){
                dataSource[index][item] = value;
            }
        });
        this.setState({ dataSource })

    }

    getGoodsItem(goodsNo,idx){
        const { dataSource,warehouseName } = this.state;
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
                id:12,
                inventory:20
            },
            topalce:[
                {
                    shelf:{
                        name:'1#货架',
                        id:'1'
                    },
                    cargospaces:[
                        {
                            name:'1#货位',
                            id:'1'

                        },{
                            name:'2#货位',
                            id:'2'

                        },{
                            name:'3#货位',
                            id:'3'

                        }
                    ]
                },{
                    shelf:{
                        name:'2#货架',
                        id:'1'
                    },
                    cargospaces:[
                        {
                            name:'1#货位',
                            id:'1'

                        },{
                            name:'2#货位',
                            id:'2'

                        },{
                            name:'3#货位',
                            id:'3'

                        }
                    ]
                }
            ]
        }
        let arry= [];

        data.topalce.forEach((obj,index)=>{
            let o = {};
            o.label = obj.shelf.name;
            o.value = obj.shelf.name;
            o.key = index;
            let arr1 = [];
            obj.cargospaces.forEach((el,i)=>{
                let ob = {};
                ob.label = el.name;
                ob.value = el.name;
                ob.key = i;
                arr1.push(ob);
            })
            o.children = arr1
            arry.push(o);
        })

        let goods = Object.assign({},dataSource[idx],data.goods); 
        goods.shelfDateSource = arry
        
        console.log(goods)
        dataSource.splice(idx,1,goods); //叫后台返回的商品数据 和 当前的合并
        this.setState({ dataSource })
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
        let { dataSource,cont } = this.state;
        let newData = { key:cont + 1};
        this.setState({
            dataSource: [...dataSource, newData],
            cont:cont + 1
        });
        
    }

    onDelete(idx){ //删除
        const { dataSource } = this.state;
        
        dataSource.splice(idx, 1);
        
        this.setState({ dataSource });
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
    
    render() {
        const warehouseOption = this.state.warehouseList.map((anItem,index)=>(<Select.Option disabled={anItem.status} value={anItem.name + ''} key={anItem.id}>{anItem.name}</Select.Option>))
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
                    dataSource={this.state.dataSource}
                    pagination={false}
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

function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(AddGoodsWarehousing);

