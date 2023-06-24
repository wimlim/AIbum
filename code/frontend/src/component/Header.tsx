/**
 * @bfief 顶部的菜单栏
 * @desc 顶部的菜单栏，包含首页、相册等菜单项
 */
import { HomeOutlined, PictureOutlined } from "@ant-design/icons"
import { Menu, MenuProps } from "antd"
import React from "react"
import { Link } from "react-router-dom"

interface HeaderProps {
}

/**
 * @brief 头部菜单项
 * 
 */
const headerItems:MenuProps['items']=[
    {
        label:"首页",
        key:"index",
        icon:
        <Link to="/index">
            <HomeOutlined />
        </Link>
    },
    {
        label:"相册",
        key:"album",
        icon:
        <Link to="/album">
            <PictureOutlined />
        </Link>
    }
]

export const Header: React.FC<HeaderProps> = () => {

    const [selectedKey, setSelectedKey] = React.useState<string>("index")

    const onClick:MenuProps['onClick']=(e)=>{
        setSelectedKey(e.key)
        console.log(e)
    }

    return (
        <Menu 
            mode="horizontal"
            items={headerItems}
            onClick={onClick}
            selectedKeys={[selectedKey]}
        />
    )
}