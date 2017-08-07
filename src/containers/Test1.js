import React, { Component } from 'react';

import { Layout, Row, Col, Radio, Carousel, Menu, DatePicker, Tooltip, Switch, Icon, BackTop, Dropdown, message, Breadcrumb, Steps, Table, Input, Tabs, Badge, Form, Cascader, Checkbox, Affix, Button, Slider, InputNumber, Calendar } from 'antd';

const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Step = Steps.step;
const FormItem = Form.Item;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
function callback(key) {
  console.log(key);
}
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}
function onCh(e) {
  console.log('checked = ${e.target.checked}');
}
const onMess = function ({ key }) {
  message.info('Click on item ${key}');
};
function onPanelChange(value, mode) {
  console.log(value, mode);
}
const menu = (
  <Menu onClick={onMess}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">2nd memu item</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);
const info = () => {
  message.info('This is a normal message');
};
function onDate(date, dateString) {
  console.log(date, dateString);
}
export default class Test1 extends Component{
    render(){
        return (
            <div>
                <Search
                placeholder="input search text"
                style={{ width: 200, marginBottom: 20, }}
                onSearch={value => console.log(value)}
              />
              <Table columns={columns} dataSource={data} />
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">
                  <h3 style={{ marginTop: 10 }}>级联选择</h3>
                  <Cascader style={{ width: 250 }} options={options} onChange={onChange} placeholder="Please select" />
                  <Checkbox onChange={onCh} style={{ paddingLeft: 10 }}>Checkbox</Checkbox>
                  <Radio style={{ paddingLeft: 10 }}>Radio</Radio>
                  <Switch defaultChecked={false} style={{ paddingLeft: 10 }} />
                  <br />
                  <DatePicker style={{ marginTop: 10 }} onChange={onDate} />
                  <h3 style={{ marginTop: 10 }}>数字输入框</h3>
                  <InputNumber min={1} max={10} defaultValue={3} />
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  <div>
                    <Affix>
                      <Button type="primary">Affix top</Button>
                    </Affix>
                    <br />
                    <Affix offsetBottom={0}>
                      <Button type="primary">Affix bottom</Button>
                    </Affix>
                  </div>
                  <h3 style={{ marginTop: 10 }}>下拉菜单</h3>
                  <Dropdown style={{ marginTop: 10 }} overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      Hover me, Click menu item <Icon type="down" />
                    </a>
                  </Dropdown>
                  <h3 style={{ marginTop: 10 }}>回到顶部</h3>
                  <div style={{ marginTop: 10 }}>
                    <BackTop>
                      <div className="ant-back-top-inner">UP</div>
                    </BackTop>
                    Scroll down to see the bottom-right
                    <strong style={{ color: '#1088e9' }}> blue </strong>
                    button.
                    </div>
                  <h3 style={{ marginTop: 10 }}>文字提示</h3>
                  <Button type="primary" onClick={info}>Display normal message</Button>
                  <h3 style={{ marginTop: 10 }}>日历</h3>
                  <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                  </div>
                </TabPane>
              </Tabs>


            </div>
        )
    }
}