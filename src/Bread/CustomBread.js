import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd';
class CustomBread extends Component {
    render() {    
        let breads = this.props.bread.breads;
        let breaditems=breads.map((bread, index) => {
                    if(typeof bread==='string'){
                        return (<Breadcrumb.Item key={index}>{bread}</Breadcrumb.Item>)
                    }else if(typeof bread==='object'){
                         return (<Breadcrumb.Item key={index}>
                            <a href={bread.url}> {bread.title} </a>
                         </Breadcrumb.Item>)
                    }
                }
                
            );
        return (
            <Breadcrumb style={{ margin: '10px 0' }}>
                {breaditems}
            </Breadcrumb>
        );
    }
}
function mapStateToProps(state) {
    return {
        bread: state.bread,
    }
}
export default connect(mapStateToProps)(CustomBread);