import React from 'react'
import { GlobalShareContext } from '../utils/GlobalShareReducer'
import { Button, Form, Input, message } from 'antd';
import { profileEdit } from '../server/UserServer';

interface UserProfileProps {
}

const displayStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {

    const {state} = React.useContext(GlobalShareContext);

    const {photo} = state;

    const ProfileModify=()=>
    {
        interface ProfileModifyProps
        {
            username:string,
            email:string,
        }

        const onFinish=(value:ProfileModifyProps)=>
        {
            const {username,email}=value;
            console.log("修改后的用户",value)
            sessionStorage.setItem("email",email)
            profileEdit({email:email}).then(
                (response)=>{
                    if(!response.ok)
                    {
                        message.error("修改失败")
                        throw new Error("修改失败")
                    }
                    return response.json()
                }).then((data)=>{message.success("修改成功")})
                .catch((error)=>{console.log(error)})
        }

        return (
            <Form
                name="基本信息"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{username:sessionStorage.getItem("username"),email:sessionStorage.getItem("email")}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    
                >
                    <Input disabled/>
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                >
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                </Form.Item>

            </Form>
        )
    }

    return (
        <div style={displayStyle}>
            {ProfileModify()}
        </div>
    )
}