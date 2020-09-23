import React from "react";
import { BrowserRouter as Router, Link  }  from 'react-router-dom'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, GoldTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;

class Siderbar extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  menuData = [{
    key: '1',
    title: 'Navigation One',
    icon: <MailOutlined />,
    children: [{
        key : '101',
        title: 'Index',
        path: 'Index'
        }, {
        key : '102',
        title: 'Material',
        path: 'Material'
    }]
  }, {
    key: '2',
    title: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [{
        key : '201',
        title: 'Area',
        path: 'Area'
        }, {
        key : '202',
        title: 'Task',
        path: 'Task'
    }]
  }, {
    key: '3',
    title: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [{
        key : '301',
        title: 'Map',
        path: 'Map'
        }, {
        key : '302',
        title: 'Complex',
        path: 'Complex'
        }, {
        key : '303',
        title: 'EMap',
        path: 'EMap'
    }]
  }]

  state = {
    openKeys: ['101'],
  }

  onOpenChange = openKeys => {
    console.log(openKeys)
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  onClick = (item, key, keyPath, domEvent) => {
    console.log(item, key, keyPath, domEvent)
    return false
  }
  render() {
    return (
            <div className='sideWrap'>
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                onClick = {this.onClick}
                // style={{ width: 256}}
            >
            {
                this.menuData.map(item => {
                    return (
                            <SubMenu key={item.key} 
                                title={
                                    <span>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </span>
                                }>
                                {
                                    item.children.map( child => {
                                        return (
                                            <Menu.Item key={child.key}><Link to={child.path} >{child.title}</Link></Menu.Item>
                                            
                                            
                                            
                                            // <Menu.Item key={child.key} onClick={()=>{
                                            //     console.log(this)
                                            //     // this.props.history.push(child.path)
                                            // }}>{child.title}</Menu.Item>
                                        )
                                    })
                                }
                            </SubMenu>
                    )
                })
            }   
            </Menu>
            </div>
    );
  }
}

export default Siderbar