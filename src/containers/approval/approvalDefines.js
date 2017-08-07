import React, { Component } from 'react';
import { Input, Table, Button, Row, Col } from 'antd'
import { connect } from 'react-redux';
import * as breadActions from '../../actions/breadActions'
import * as approvalActions from '../../actions/approval/approvalActions'
import {
  Link,
} from 'react-router-dom';
const Search = Input.Search;
class ApprovalDefines extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '' }
       
        this.columns = [{
            title: '名字',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '流程ID',
            dataIndex: 'processKey',
            key: 'processKey',
        }, {
            title: '任务节点',
            dataIndex: 'activitiID',
            key: 'activitiID',
        }, {
            title: '序号',
            dataIndex: 'indx',
            key: 'indx',
        }, {
            title: '状态',
            dataIndex: 'validstr',
            key: 'validstr',
        }, {
            title: '单据类型',
            dataIndex: 'sheettype',
            key: 'sheettype',
        }, {
            title: '业务类型',
            dataIndex: 'bsType',
            key: 'bsType',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (<div>
                    <a href="javascript:void(0);" onClick={() => this.editA(record)}>编辑</a>|<a href="javascript:void(0);" onClick={() => this.deleteA(record)}>删除</a>|
                    {/* <Link to="/appreovalpeopledefines">审批人员</Link> */}
                </div>)
            }
        }];
    }
    changePage(page, pageSize){
        console.log('hello,this is changepage ..................'+page+pageSize);
        let dispatch = this.props.dispatch;
        dispatch(approvalActions.allApprovalDefines(dispatch,{
            page:page,
            pageSize:pageSize
        }));
    }
    editA(ap) {
        let dispatch = this.props.dispatch;
        dispatch(approvalActions.editA(ap));
        this.props.history.push('/approvalDefine/'+ap.id);
    }
    deelteA(ap) {
        let dispatch = this.props.dispatch;
         dispatch(approvalActions.deelteA(ap));
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(breadActions.setBreads(['主页', '审批流', '列表']));
        dispatch(approvalActions.countApprovalDefines(dispatch));
        dispatch(approvalActions.allApprovalDefines(dispatch,{page:this.props.approval.current,pageSize:15}));
    }
    componentWillUnmount() {
        //let dispatch = this.props.dispatch;
       // dispatch(approvalActions.clearApprovalDefines());
    }

    render() {
        let datasource = this.props.approval.approvalDefines;
        let history = this.props.history;
        let appp=this.props.approval;
        let pagination={
            total:appp.total,
            pageSize:appp.pageSize,
            current:appp.current,
            onChange:this.changePage.bind(this)
        };
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Search placeholder="input search text" style={{ width: 200, marginBottom: 20, }} onSearch={(value) => {
                            this.setState({ searchText: value });
                        }} />
                    </Col>
                    <Col span={12} style={{align:'right'}}>
                        <Button onClick={()=>this.editA(null)} >添加</Button>
                    </Col>
                </Row>
                <Table dataSource={datasource} columns={this.columns}  pagination={pagination}/>
            </div >
        )   
    }
}

function mapStateToProps(state) {
    return {
        approval: state.approval,
    }
}
export default connect(mapStateToProps)(ApprovalDefines);

