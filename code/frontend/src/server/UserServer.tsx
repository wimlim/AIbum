/**
 * @file UserServer.tsx
 * @description: 用户相关的服务
 */

import { LoginProps, RegisterProps } from "../component/LoginBox"
import { BackendUserAuthProps, BackendUserInfoProps, defaultConfiguration } from "../defaultConfiguration"
import md5 from "js-md5"

interface GetUserInfoProps {
    formdata: LoginProps,
    callback: (data: BackendUserInfoProps) => void
}

const configuration = defaultConfiguration;

const { backendUrl, loginPathName, registerPathName } = configuration;

export const getUserInfo = (props: GetUserInfoProps) => {

    const {callback}=props;
    const url = backendUrl + loginPathName;

    const formData:BackendUserAuthProps={
        account:props.formdata.account,
        password:md5(props.formdata.password)
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error))

}

export const registerUser = (props: RegisterProps) => {

    let {account,password}=props;

    const url = backendUrl + registerPathName;

    const formData:BackendUserAuthProps={
        account:account,
        password:md5(password)
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}
