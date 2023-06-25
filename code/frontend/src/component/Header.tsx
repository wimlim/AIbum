/**
 * @fileoverview header
 * @name Header.tsx
 * @description header: search,upload,settings,help,logout
 */
import { LogoutOutlined, QuestionOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, Space, Tooltip, Upload, message } from 'antd';
import type {UploadProps} from 'antd'
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import ReactLogo from '../logo.svg';
import { removeUserAuth } from '../server/UserAuth';
const { Search } = Input;

interface HeaderProps {
}

const HeaderUploadProps:UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };



const uesrMenuItems:MenuProps['items'] = [
  {
    key: '1',
    label: '个人中心',
  },
  {
    key: '2',
    label: (
      <Button icon={<LogoutOutlined/>} type='text' size='small' onClick={()=>{removeUserAuth();window.location.reload();}}>
        退出登录
      </Button>
    )
  },
]

export const Header: React.FC<HeaderProps> = () => {
    return (
        <Space>
            <Search
                placeholder="Search"
                size='large'
                allowClear
                style={{
                    marginTop: '10px',
                    width: '700px',
                }}
            />
            <Upload {...HeaderUploadProps}>
                <Button icon={<UploadOutlined/>}  size ='large'>
                    上传
                </Button>
            </Upload>
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