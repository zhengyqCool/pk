import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as breadActions from '../../../../actions/breadActions';
import { Table, Input, Button,Row,Col,Select} from 'antd';

class SalverList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:{},
            shelfId:0,
            shelfList:[]
        }
    }
    componentDidMount(){
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '仓库管理','我的仓库','货架管理','货位管理']));
        
        this.initClassify();
    }

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
        let data = {
            no:'123456789',
            sheflSatet:true,
            sNum:5
        }
        let arr =[];
        for(let i = 0,length = data.sNum; i < length; i++){
            let o = {key:i + ''};
            arr.push(o);
        }
        this.setState({
            dataSource:data,
            shelfList:arr,
            shelfId:this.props.match.params.adid,
        })
    }

    //增加一行
    handleAdd = () => {
        let { shelfList } = this.state;
        let newData = {key: shelfList.length + 1,};
        this.setState({
            shelfList: [...shelfList, newData],
        });
    }

    //删除一行
     onDelete = (index) => {
        console.log(index);
        let shelfList = [...this.state.shelfList];
        shelfList.splice(index, 1);
        this.setState({ shelfList:shelfList });
    }
    
    render() {
        let { shelfList } = this.state;
        let no = this.state.dataSource.no;
        return (
            <div>
                <Row className="">
                    <Col span={12}>
                        <h4>{'货架编号 : ' + no}</h4>
                    </Col>
                    <Col span={12} className="text-right">
                        <Button className="editable-add-btn" onClick={this.handleAdd}>增加仓位</Button>
                        <Button onClick={()=>{this.props.history.go(-1)}} type="primary" style={{marginLeft:10}}>返回</Button>
                    </Col>
                </Row>
                 <Shelf shelfList={shelfList} deleteFc={this.onDelete}/> 
            </div>
        );
    }
}
class Shelf extends Component {

    constructor(props){
        super(props)
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
                title: '备注信息',
                dataIndex: 'stockClassify',
                render:(ext, record, index)=> (
                    <Input placeholder="请输入备注信息" />
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (this.props.shelfList.length > 1 ?
                            <a href="javascript:;"  onClick={() => props.deleteFc(index)} >删除</a> 
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
    
    render(){
        let shelfList  = this.props.shelfList;
        let columns = this.columns;
        return(
             <div> 
                <Table bordered dataSource={shelfList} columns={columns} pagination={false} />
                <div style={{textAlign:'center',marginTop:10}}>
                    <Button style={{width:150}} type="primary">保存</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(SalverList);