/**
 * @file loginView.tsx
 * @desc 登录页面
 * */
import React from "react";
import {LoginBox} from "../component/loginBox";

interface LoginViewProps {

}
export const LoginView:React.FC<LoginViewProps> = () => {
    return (
        <LoginBox/>
    )
}