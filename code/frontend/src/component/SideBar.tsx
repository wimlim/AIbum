import { HomeOutlined, PictureOutlined, ToolOutlined } from "@ant-design/icons";
import { Menu } from "antd"
import type { MenuProps } from 'antd';
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', '1',<Link to={'/index'}><HomeOutlined/></Link>),
    getItem('相册', '2',<Link to={'/albums'}><PictureOutlined/></Link>),
    getItem('功能','3',<Link to={'/tool'}><ToolOutlined/></Link>)
];

interface SideBarMenuAndLocationProps {
  menuKey: string;
  location: string;
}

const sideBarMenuAndLocation: SideBarMenuAndLocationProps[] = [
  {
    menuKey: '1',
    location: '/index',
  },
  {
    menuKey: '2',
    location: '/albums',
  },
  {
    menuKey: '3',
    location: '/tool',
  }
];

export const SideBar: React.FC<SideBarProps> = () => {

    const location=useLocation();
    console.log(location.pathname)
    
    let selectedKey = '1';

    sideBarMenuAndLocation.forEach((item) => {
      if(item.location === location.pathname) selectedKey=item.menuKey;
    })

    return (
        <Menu 
          theme="dark" 
          defaultSelectedKeys={[selectedKey]}
          mode="inline" 
          items={items}
        />
    )
}