/**
 * @file loginView.tsx
 * @desc 登录页面
 * */
import React from "react";
import {LoginBox} from "../component/loginBox";
import {Image} from "antd";
import logo from "../assets/img/AIbum.png"

interface LoginViewProps {

}

const leftStyle:React.CSSProperties={
    width:"70%",
    border:"1px solid black",
    float:"left",
    height:"100%",
    position:"absolute",
    top:0,
    left:0,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

}

const rightStyle:React.CSSProperties={
    width:"30%",
    float:'right',
    height:"100%",
    position:"absolute",
    top:0,
    right:0,
    
}

export const LoginView:React.FC<LoginViewProps> = () => {
    return (
        <>
            <div style={leftStyle}>
                { <Image
                    src={logo}
                    preview={false}
                    
                /> }
            </div>
            <div style={rightStyle}>
                <LoginBox/>
            </div>
        </>
    )
}