import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon } from 'antd';
import * as loginActions from '../actions/loginActions'
import {
    // BrowserRouter as Router,
    Link,
} from 'react-router-dom';


class LoginMenu extends Component {
    componentDidMount() {
        let login = this.props.login.login;
        let dispatch = this.dispatch;
        if (login == null) {
            dispatch(loginActions.getLogin(dispatch));
        }
    }
    render() {
        let login = this.props.login.login;
        return (
            <Dropdown overlay={
                <Menu>
                    <Menu.Item>
                        <Link to='depart'><Icon type="rocket" /> {login.departname} </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='worker'><Icon type="rocket" /> {login.workername} </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='system'>  <Icon type="rocket" />{login.sysDepartName}</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <a href='/login.jsf'>  <Icon type="setting" />个人设置</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href='/login.jsf'>  <Icon type="setting" />修改密码</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href='/login.jsf'><Icon name="rocket" /> 退出</a>
                    </Menu.Item>
                </Menu>
            }>
                <a className="ant-dropdown-link" style={{ color: '#fff', fontSize: 16 }} href="#">
                    欢迎光临:{login.workername} <Icon type='down' />
                </a>
            </Dropdown>

        );
    }

}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(LoginMenu);