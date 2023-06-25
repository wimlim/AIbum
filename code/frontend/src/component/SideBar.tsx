import { HomeOutlined, PictureOutlined, ToolOutlined } from "@ant-design/icons";
import { Menu } from "antd"
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";

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
    getItem('照片', '2',<Link to={'/album'}><PictureOutlined/></Link>),
    getItem('功能','3',<Link to={'/index'}><ToolOutlined/></Link>)
];

export const SideBar: React.FC<SideBarProps> = () => {
    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
    )
}