/**
 * @file 相册详情页头部组件
 * @desc 返回键，添加图片，移除图片，分享，更多操作
 */

import React from 'react'
import { Button, Dropdown, Layout, MenuProps, Tooltip, Upload, UploadProps } from 'antd'
import { CloseCircleOutlined, DeleteOutlined, FileAddOutlined, LeftOutlined, MoreOutlined, PictureFilled, ShareAltOutlined } from '@ant-design/icons'
import { AlbumProps } from '../../defaultConfiguration'
import { deleteAlbum } from '../../server/AlbumServer'
import { useNavigate } from 'react-router-dom'
import { AlbumAddPicture } from './AlbumAddPhoto'
import { AlbumDeletePhoto } from './AlbumDeletePhoto'

interface AlbumDetailHeaderProps {
    album:AlbumProps
    setAlbum:Function
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
        label:'删除相册',
        icon:<DeleteOutlined/>,
    }
]

export const AlbumDetailHeader: React.FC<AlbumDetailHeaderProps> = (props) => {

    const navigate= useNavigate();
    const {album}=props;


    console.log(album)

    const onClick:MenuProps['onClick']=({key})=>
    {
        if(key==='1')
        {
            deleteAlbum(album.id.toString()).then((res)=>{
                return res.json();
            }).then((data)=>{console.log(data)})
            .catch((err)=>{console.log(err)})
            navigate('/albums');
        }
    }

    const content=()=>
    {
        return (
            <div style={AlbumDetailHeaderStyle}>
                <Tooltip title='返回'>
                    <Button shape='circle' style={LeftStyle} icon={<LeftOutlined />} size='large' href='/albums'/>
                </Tooltip>
                <Dropdown 
                    menu={{items:dropDownMenuItems,onClick:onClick}}
                >
                    <Button icon={<MoreOutlined/>} style={RightStyle} shape='circle' size='large'/>
                </Dropdown>
                <AlbumDeletePhoto album={album} RightStyle={RightStyle} setAlbum={props.setAlbum}/>
               <AlbumAddPicture RightStyle={RightStyle} album={album} setAlbum={props.setAlbum}/>
                <Tooltip title='分享'>
                    <Button icon={<ShareAltOutlined/>} style={RightStyle} shape='circle' size='large'/>
                </Tooltip>
    
            </div>
        )
    }

    return content();

    
}