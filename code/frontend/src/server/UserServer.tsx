/**
 * @file UserServer.tsx
 * @description: 用户相关的服务
 */

import exp from "constants";
import { LoginProps, RegisterProps } from "../component/LoginBox"
import { BackendUserAuthProps, defaultConfiguration } from "../defaultConfiguration"

interface GetUserInfoProps {
    formdata: LoginProps,
}

const configuration = defaultConfiguration;

const { backendUrl, loginPathName, registerPathName,profileEditPathName} = configuration;

export const getUserInfo:(props: GetUserInfoProps) => Promise<Response> = (props: GetUserInfoProps) => {

    const url = backendUrl + loginPathName;

    const formData:BackendUserAuthProps={
        
        account:props.formdata.account,
        password:props.formdata.password
    };

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

export const registerUser:(props:RegisterProps)=>Promise<Response> = (props: RegisterProps) => {

    let {account,password}=props;

    const url = backendUrl + registerPathName;

    const formData:BackendUserAuthProps={
        account:account,
        password:password,
    }

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

interface ProfileEditProps
{
    email:string,
}

export const profileEdit=(props:ProfileEditProps)=>{

    const url = backendUrl + profileEditPathName;
    return fetch(
        url,
        {
            method:"POST",
            body:JSON.stringify({email:props.email,userid:sessionStorage.getItem("userid")}),
            headers:{
                'Content-Type': 'application/json'
            }
        }
    )
}
