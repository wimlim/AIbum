
import { BookOutlined, HistoryOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Divider, Typography } from 'antd';
import Button from 'antd/lib/button';

interface ToolProps {
}

const toolFileStyle:React.CSSProperties={
    width:'50%',
    height:'350px',
    margin:'0 auto',
    position:'absolute',
    top:'0',
    bottom:'0',
    left:'0',
    right:'0',
    border:'1px solid #ccc',
    textAlign:'center'
}

const buttonStyle:React.CSSProperties={
    width:'100%',
    height:'50px',
    margin:'10px 0' 

}

const toolFileContent=()=>
{
    return (
        <>
            <Typography.Title level={3}>工具</Typography.Title>
            <Divider />
            <Button type='text' block style={buttonStyle} icon={<BookOutlined />}>小故事创作</Button>
            <Button type='text' block style={buttonStyle} icon={<VideoCameraOutlined />}>精彩时刻的自动化剪辑</Button>
            <Button type='text' block style={buttonStyle} icon={<HistoryOutlined />}>回忆录创作</Button>
        </>
    )
}

export const Tool:React.FC<ToolProps> =()=>{
    return (
        <div style={{position:'relative',height:'50vh'}}>
            <div style={toolFileStyle}>
                {toolFileContent()}
            </div>
        </div>
    )
}