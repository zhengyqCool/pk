import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd';
import {
    // BrowserRouter as Router,,
    Link,
} from 'react-router-dom';
import * as lmactions from '../actions/lmenuActions'
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
class LeftMenu extends Component {
    componentDidMount() {
        this.props.dispatch(lmactions.getLmenus());
    }
    processMenuitems(items) {
        return (
            items.map((menu, indx) => 
                 <Item key={menu.id}>
                     {
                         menu.target==='lash'?
                         (<Link to={menu.url}>{menu.title}</Link>):(<a href={menu.url} target={menu.target}>{menu.title}</a>)
                     }
                </Item>
            )
        );
    }
    render() {
        let menus = this.props.lmenu.menus;
        let submenusss=menus.map((menu, index) => 
                (<SubMenu key={menu.menu.id} title={<span style={{fontWeight:'bold'}}><Icon type={menu.menu.icon} />{menu.menu.title}</span>}>
                    {this.processMenuitems(menu.menuitems)}
                </SubMenu>)
            );
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['7']}
                defaultOpenKeys={['7']}
                style={{ height: '100%' }}>
                {submenusss}
            </Menu>
        );
    }
}
function mapStateToProps(state) {
    return {
        lmenu: state.lmenu
    }
}
export default connect(mapStateToProps)(LeftMenu);