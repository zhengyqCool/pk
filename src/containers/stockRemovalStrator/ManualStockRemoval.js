import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Input, Table, Form, Button, Select, Row, Col, Icon, DatePicker, Search, AutoComplete,Cascader,InputNumber} from 'antd';
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions';

const Option = Select.Option;
const { TextArea } = Input;

class ManualStockRemoval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            warehouseList:[],
            cgdDataSource:[]
        }
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '商品入库', '新增入库']));
        this.initDataSource() 
    }   

    //初始化仓库列表、采购单号
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

        const cgdDataSource = ['11111','22222','33333'];//采购单信息
        const warehouseList = [//仓库列表
            {
                name:'仓库1',
                id:1
            },{
                name:'仓库2',
                id:2
            },{
                name:'仓库3',
                id:3
            },
        ]

        this.setState({
            warehouseList:warehouseList,
            cgdDataSource:cgdDataSource
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    }
    showModal() {
        this.setState({
            modalVisible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }


    render() {
        let warehouseList  = this.state.warehouseList.map((o,index)=>(<Option key={index} value={o.name}>{o.name}</Option>));
        

        let history = this.props.history;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)} >
                    <Row>
                        <Col span={5}>
                            <Form.Item label='出库人' {...formItemLayout} >
                                {
                                    getFieldDecorator('rkName', {
                                        rules: [{ required: true, message: '请输出库人！' }],
                                        initialValue:'',
                                    })(<Input type="text" placeholder='请输出库人' />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={15}>
                            <Form.Item label='出库备注' {...formItemLayout} >
                                {
                                    getFieldDecorator('rkName', {
                                        rules: [{ required: false, message: '请输入备注信息！' }],
                                        initialValue:'',
                                    })(<Input type="text" placeholder='请输入备注信息' />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={4} className="text-right">
                             <Button type="primary" onClick={()=>{this.props.history.go(-1)}}>返回</Button>
                        </Col>
                    </Row>
                    <EditableTable/>
                    <Row className="footerBtn">
                        <Col className='ant-col-xs-24 ant-col-sm-24' style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())} >确认保存</Button>
                            <Button className="ml-10" >保存</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
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
    onSelect(value){
        
    }
    render() {
        return (
            <div className="editable-cell">
                <div className="editable-cell-input-wrapper">
                    <AutoComplete
                        value={this.state.value}
                        style={{ width: 160 }}
                        dropdownMatchSelectWidth={false}
                        dataSource={this.state.optionData}
                        placeholder="请输入商品编号"
                        allowClear={true}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onSelect={(value)=> this.onSelect(value)}
                    />
                </div>
            </div>
        );
    }
}

//商品名称
class EditableCellGoods extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onChange(value, selectedOptions) {
        console.log(value, selectedOptions);
    }
    componentDidMount(){
        console.log(this.props)
    }   
    render() {
        const options = [
            {
                value: '康师傅方便面',
                label: '康师傅方便面',
                children:[{
                    value:'康师傅',
                    label:'康师傅',
                    children: [{
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
                    }]
                }]
            },{
                value: '康师傅冰红茶',
                label: '康师傅冰红茶',
                children:[{
                    value:'康师傅',
                    label:'康师傅',
                    children: [{
                        value: '500ml',
                        label: '500ml',
                        children:[{
                            value:'水蜜桃',
                            label:'水蜜桃',
                        },
                        {
                            value:'柚子味',
                            label:'柚子味',
                        }]
                    }, {
                        value: '200ml',
                        label: '200ml',
                        children:[{
                            value:'菠萝味',
                            label:'菠萝味',
                        },
                        {
                            value:'蜂蜜味',
                            label:'蜂蜜味',
                        }]
                    }]
                }]
            }
        ];
        return (
            <div className="editable-cell">
                <div className="editable-cell-input-wrapper">
                    <Cascader
                        options={options}
                        onChange={(value, selectedOptions)=> this.onChange(value, selectedOptions)}
                        placeholder="请输入商品名称"
                        showSearch
                        notFoundContent='未找到对应的商品！'
                    />
                </div>
            </div>
        );
    }
}


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
            dataSource: [{
                key:'01',
            },{
                key:'02',
            }],
        }
        this.columns = [
            {
                title: '商品编号',
                dataIndex: 'goodsNo',
                render: (text, record, index) => (
                    <EditableCell
                        dispatch={props.dispatch}
                        value={text}
                        onChange={this.onCellChange(index, 'goodsNo')}
                    />
                ),
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                render: (text, record, index) => (
                    <EditableCellGoods
                        goodsData={this.props.goodsData}
                        onChange={this.onCellChange(index, 'goodsName')}
                    />
                ),
            },
            {
                title: '规格',
                dataIndex: 'goodsNorms',
                render:(ext, record, index)=> (
                    <Input placeholder="商品规格" disabled={true}/>
                )
            },
            {
                title: '特征值',
                dataIndex: 'eigenvalue',
                render:(ext, record, index)=> (
                    <Input placeholder="商品特征值" disabled={true}/>
                )
            },
            {
                title: '品牌',
                dataIndex: 'goodsBrand',
                render:(ext, record, index)=> (
                    <Input placeholder="商品品牌" disabled={true}  onChange={(text)=> console.log(text)}/>
                )
            },
            {
                title: '货架',
                dataIndex: 'shelf',
                render:(ext, record, index)=> (
                    <Cascader
                        options={shelfOptions}
                        onChange={(value, selectedOptions)=> this.onChange(value, selectedOptions)}
                        placeholder="请选择货架"
                        showSearch
                        notFoundContent='未找到对应的货架'
                    />
                )
            },
            {
                title: '货位',
                dataIndex: 'pallet',
                render:(ext, record, index)=> (
                    <Input placeholder="商品货位" disabled={true}/>
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
                        this.state.dataSource.length > 1 ?
                            <a onClick={()=>this.onDelete(index)} href="javascript:;">删除</a>
                            : 
                            null
                    );
                },
            }
        ];
    }
    componentDidMount(){
        console.log(this.props);
    }

    booleanshouldComponentUpdate(){
        console.log(this.props);
    }

    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.props.goodsList.goodsList];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        
        
    }
    handleAdd = () => {
        
       
    }
    render() {
        const columns = this.columns;
        return (
            <div>
                <div className="textRight">
                    <Button className="editable-add-btn" onClick={this.handleAdd}>增加一行</Button>
                </div>
                <Table bordered dataSource={this.state.dataSource} columns={columns} pagination={false} />  
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}
//export default connect(mapStateToProps)(ApprovalDefine);

export default Form.create()(connect(mapStateToProps)(ManualStockRemoval));

