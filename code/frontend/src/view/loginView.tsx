/**
 * @file LoginView.tsx
 * @desc 登录页面
 * */
import React from "react";
import { LoginBox } from "../component/LoginBox";
import {Image} from "antd";
import logo from "../assets/img/AIbum.png"

interface LoginViewProps {

}

const container:React.CSSProperties={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minHeight:"100vh",
    width:'100%',
    flexWrap:"wrap",
    backgroundImage:"url(https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=829&q=80)",
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    border:'none',
    padding:'0',
    margin:'0,auto',
    overflow:'hidden',
}

const content:React.CSSProperties={
    display:'flex',
    overflow:'hidden',
    width:'50%',
    height:'50%',
    alignItems:'center',
    padding:'20px',
    borderRadius:'20px',
    boxShadow:'0 0 10px 0 rgba(0,0,0,0.2)',
    backgroundColor:'white',
}

const logoStyle:React.CSSProperties={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'50%',
    height:'100%',
    borderRadius:'20px',
}

const loginBoxStyle:React.CSSProperties={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'50%',
    height:'100%',
    borderRadius:'20px',
}

export const LoginView:React.FC<LoginViewProps> = () => {
    return (
        <div style={container}>
            <div style={content}>
                <div style={logoStyle}>
                    <Image src={logo} preview={false}/>
                </div>
                    
                <div style={loginBoxStyle}>
                    <LoginBox/>
                </div>
            </div>
        </div>
    )
}