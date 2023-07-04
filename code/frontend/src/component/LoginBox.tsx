/**
 * @fileoverview LoginBox
 * @brief 登录框
 *
 * */

import React from "react";
import {Form, Input, Button, message} from 'antd'
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import { getUserAuth, setUserAuth } from "../server/UserAuth";
import { type } from "os";
import { getUserInfo, registerUser } from "../server/UserServer";
import { BackendUserInfoProps } from "../defaultConfiguration";
import { Rule } from "antd/es/form";
interface LoginBoxProps {

}

export interface LoginProps{
    account:string,
    password:string
}

export interface RegisterProps{
    account:string,
    password:string,
    email:string;                               //用户邮箱
}

export const LoginBox:React.FC<LoginBoxProps> = () => {

    const [isLogin, setIsLogin] = React.useState(true)

    const [messageApi,contextHolder]=message.useMessage();

    const onFinishLogin=(values:LoginProps)=>{
        console.log("login form values",values)
        //TODO:发送数据给后端请求用户信息
        getUserInfo({formdata:values})
        .then((response)=>{
            if(response.status===200)return response.json();
            else if(response.status === 404)throw new Error("未连接到服务器")
            else throw new Error("登录失败")
        })
        .then((data)=>{
            messageApi.open({
                type:'success',
                content:'登录成功'
            })
            console.log(typeof(data))
            const {username,userid}=data.data;
            sessionStorage.setItem("username",username)
            sessionStorage.setItem("userid",userid.toString())
            setUserAuth(true)
            window.location.reload();
        })
        .catch((error)=>{
            messageApi.open({
                type:'error',
                content:error.message
            })
        })
    }

    const onFinishRegister=(values:RegisterProps)=>{
        console.log("register form values",values)
        //TODO:发送数据给后端
        registerUser(values)
        .then(response=>{
            if(response.status===200)return response.json();
            else if(response.status === 404)throw new Error("未连接到服务器")
            else throw new Error("注册失败")
        })
        .then(()=>{
            messageApi.open({
                type:'success',
                content:'注册成功'
            })
            setIsLogin(true);
        })
        .catch((error)=>{
            console.log(error)
            messageApi.open({
                type:'error',
                content:error.message
            })
        })


    }

    const loginButton=()=>
    {
        return <Button type = 'primary' htmlType="submit">登录</Button>
    }

    const registerButton=()=>
    {
        return <Button type = 'primary' htmlType='submit'>注册</Button>
    }

    const backButton=()=>
    {
        return <Button type = 'primary' onClick={()=>setIsLogin(true)}>返回</Button>
    }

    const accountRule=[
        {
            required:true,
            message:"请输入你的账号"
        },
    ]

    const passwordRule=[
        {
            required:true,
            message:"请输入你的密码"
        },
    ]
    
    const confirmRule:Rule[]=[
        {
            required:true,
            message:"请确认你的密码"
        },
        //TODO:添加密码一致性检查
        ({getFieldValue})=>({
            validator(_,value){
                if(!value||getFieldValue('password')===value){
                    return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"))
            }
        })
    ]

    const emailRule:Rule[]=[
        {
            required:true,
            message:"请输入你的邮箱"
        },
        {
            type:'email',
            message:"请输入正确的邮箱"
        }
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
                <div style={{float:'right'}}>
                    <Button type = 'primary' onClick={()=>setIsLogin(false)}>注册</Button>
                </div>
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
                    dependencies={['password']}
                    rules={confirmRule}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="Confirm Password"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={emailRule}
                >
                    <Input prefix={<MailOutlined/>} placeholder="Email" name="email"/>
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
        <div>
            {contextHolder}
            {boxContent()}
        </div>
    )
}