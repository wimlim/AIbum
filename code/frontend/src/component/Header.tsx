/**
 * @fileoverview header
 * @name Header.tsx
 * @description header: search,upload,settings,help,logout
 */
import { LogoutOutlined, QuestionOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Button, Dropdown, Input, Space,Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ReactLogo from '../logo.svg';
import { removeUserAuth } from '../server/UserAuth';
import { UploadPicture } from './UploadPicture';
const { Search } = Input;


interface HeaderProps {

}



export const Header: React.FC<HeaderProps> = () => {

    const navigate = useNavigate();

    const uesrMenuItems:MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Button icon={<UserOutlined/>} type='text' size='small' onClick={()=>{navigate('/profile')}}>
            个人信息
          </Button>
        )
      },
      {
        key: '2',
        label: (
          <Button icon={<LogoutOutlined/>} type='text' size='small' onClick={()=>{removeUserAuth();window.location.reload();}}>
            退出登录
          </Button>
        )
      },
    ];

    return (
        <Space>
            <Search
                placeholder="Search"
                size='large'
                allowClear
                style={{
                    marginTop: '10px',
                    width: '100%',
                }}
            />
            <UploadPicture/>

            <Tooltip title='设置'>
                <Link to='/settings'>
                    <Button icon={<SettingOutlined/>} shape='circle' size='large'/>
                </Link>
            </Tooltip>
            <Tooltip title='帮助'>
                <Link to='/help'>
                    <Button shape='circle' size='large' icon={<QuestionOutlined/>}></Button>
                </Link>
            </Tooltip>
            <Dropdown menu={{items:uesrMenuItems}}>
                <Avatar size='large' style={{display:'flex'}} src={ReactLogo}/>
            </Dropdown>
        </Space>
    )
}