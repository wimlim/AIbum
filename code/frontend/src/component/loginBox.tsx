/**
 * @fileoverview LoginBox
 * @brief 登录框
 *
 * */

import React from "react";
import {Form, Input, Button} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { setUserAuth } from "../server/UserAuth";
interface LoginBoxProps {

}

export interface LoginProps{
    account:string,
    password:string
}

export interface RegisterProps{
    account:string,
    password:string,
}

const LoginBoxStyle:React.CSSProperties={
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    border:"1px solid black",
    width:'300px',
    padding:"20px",
    height:"300px"
}

export const LoginBox:React.FC<LoginBoxProps> = () => {

    const [isLogin, setIsLogin] = React.useState(true)


    
    const onFinishLogin=(values:LoginProps)=>{
        console.log("login form values",values)
        //TODO:发送数据给后端请求用户信息
        setUserAuth(true);
        window.location.reload();
        
    }

    const onFinishRegister=(values:RegisterProps)=>{
        console.log("register form values",values)
        setIsLogin(true)
        //TODO:发送数据给后端
    }

    const loginButton=()=>
    {
        return <Button type = 'primary' htmlType="submit" onClick={()=>setIsLogin(true)}>登录</Button>
    }

    const registerButton=()=>
    {
        return <Button type = 'primary' htmlType='submit' onClick={()=>setIsLogin(false)}>注册</Button>
    }

    const backButton=()=>
    {
        return <Button type = 'primary' onClick={()=>setIsLogin(true)}>返回</Button>
    }

    const accountRule=[
        {
            required:true,
            message:"Please input your username!"
        },
    ]

    const passwordRule=[
        {
            required:true,
            message:"Please input your password!"
        },
    ]
    
    const confirmRule=[
        {
            required:true,
            message:"Please confirm your password!"
        },
    ]

    const loginContent=()=>
    {
        return (
            <Form
                name="AIbum_login"
                onFinish={onFinishLogin}
            >
                <Form.Item
                    name="account"
                    rules={accountRule}
                >
                    <Input prefix ={<UserOutlined/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={passwordRule}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                </Form.Item>
                <div style={{float:'left'}}>{loginButton()}</div>
                <div style={{float:'right'}}>{registerButton()}</div>
            </Form>
        )
    }

    const registerContent=()=>
    {
        return (
            <Form
                name="AIbum_register"
                onFinish={onFinishRegister}
            >
                <Form.Item
                    name="account"
                    rules={accountRule}
                >
                    <Input prefix ={<UserOutlined/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={passwordRule}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    rules={confirmRule}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="Confirm Password"/>
                </Form.Item>
                <div style={{float:'left'}}>{backButton()}</div>
                <div style={{float:'right'}}>{registerButton()}</div>
            </Form>
        )
    }

    const boxContent=()=>
    {
        return (
            <>
                {isLogin&&<>
                    <h1 style={{ textAlign: 'center' }}>登录</h1>
                    {loginContent()}
                </>}
                {!isLogin&&<>
                    <h1 style={{ textAlign: 'center' }}>注册</h1>
                    {registerContent()}
                </>}
            </>
        )
    }
    return(
        <div style={LoginBoxStyle}>
            {boxContent()}
        </div>
    )
}