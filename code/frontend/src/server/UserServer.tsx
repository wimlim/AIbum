/**
 * @file UserServer.tsx
 * @description: 用户相关的服务
 */

import { LoginProps, RegisterProps } from "../component/LoginBox"
import { BackendUserAuthProps, BackendUserInfoProps, defaultConfiguration } from "../defaultConfiguration"
import md5 from "js-md5"

interface GetUserInfoProps {
    formdata: LoginProps,
}

const configuration = defaultConfiguration;

const { backendUrl, loginPathName, registerPathName } = configuration;

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
