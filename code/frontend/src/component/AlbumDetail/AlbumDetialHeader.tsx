/**
 * @file 相册详情页头部组件
 * @desc 返回键，添加图片，移除图片，分享，更多操作
 */

import React from 'react'
import { Button, Dropdown, Layout, MenuProps, Tooltip } from 'antd'
import { DeleteOutlined, FileAddOutlined, LeftOutlined, MoreOutlined, PictureFilled, ShareAltOutlined } from '@ant-design/icons'
import { Tool } from '../Tool'

interface AlbumDetailHeaderProps {
}

const AlbumDetailHeaderStyle:React.CSSProperties = {
    backgroundColor:"white",
    border:'1px solid #f0f0f0',
    height:'64px',
    padding:'10px'
}

const LeftStyle:React.CSSProperties = {
    float:'left',
}

const RightStyle:React.CSSProperties = {
    float:'right',
}

const dropDownMenuItems:MenuProps['items']=[
    {
        key:'1',
        label:'删除相册'
    }
]

export const AlbumDetailHeader: React.FC<AlbumDetailHeaderProps> = (props) => {

    return (
        <div style={AlbumDetailHeaderStyle}>
            <Tooltip title='返回'>
                <Button shape='circle' style={LeftStyle} icon={<LeftOutlined />} size='large' href='/albums'/>
            </Tooltip>
            <Dropdown menu={{items:dropDownMenuItems}}>
                <Button icon={<MoreOutlined/>} style={RightStyle} shape='circle' size='large'/>
            </Dropdown>
            <Tooltip title='移除图片'>
                <Button icon={<DeleteOutlined/>} style={RightStyle} shape='circle' size='large'/>
            </Tooltip>
            <Tooltip title='添加图片'>
                <Button icon={<FileAddOutlined/>} style={RightStyle} shape='circle' size='large'/>
            </Tooltip>
            <Tooltip title='分享'>
                <Button icon={<ShareAltOutlined/>} style={RightStyle} shape='circle' size='large'/>
            </Tooltip>

        </div>
    )
}