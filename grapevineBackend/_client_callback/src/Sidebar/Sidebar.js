import React from 'react';
import 'antd/dist/antd.css';
import {
  UserOutlined,
  MenuFoldOutlined,
  MessageOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import "./sidebar.scss"
import { useNavigate} from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Users', '1', <UserOutlined />),
  getItem('Posts', '2', <MessageOutlined />),
 
];

const Sidebar = ( ) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  const navigator = useNavigate();
  const routeHandler = (key) => {    
      if (key.key== 2) {
        navigator(`/posts`)
      }
      else {
        navigator('/users')
      }}

  return (
    <div className='sidebar'
      style={{
        width: 256,
      }} 
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick = {routeHandler}
      />
    </div>
  );
};

export default Sidebar;