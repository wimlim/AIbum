/**
 * @fileoverview loginBox
 * @brief 登录框
 *
 * */

import React from "react";
import {Form, Input, Button, Checkbox} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
interface LoginBosProps {

}

const LoginBoxStyle:React.CSSProperties={
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    border:"1px solid black",
}

export const LoginBox:React.FC<LoginBosProps> = () => {

    const onFinish=(values:any)=>
    {
        console.log('Recieved values of form: ', values)
    }
    return(
        <Form
            name="normal_login"
            style={LoginBoxStyle}
        >
            <Form.Item>
                <Input prefix ={<UserOutlined/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item>
                <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}