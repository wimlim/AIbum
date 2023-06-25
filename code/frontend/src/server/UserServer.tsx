/**
 * @file UserServer.tsx
 * @description: 用户相关的服务
 */

import { LoginProps, RegisterProps } from "../component/LoginBox"

interface UserInfoProps{
    username:string,
    uesrId:string,
}

interface GetUserInfoProps {
    formdata: LoginProps,
    callback: (data: UserInfoProps) => void
}

export const getUserInfo = (props: GetUserInfoProps) => {
}

export const registerUser = (props: RegisterProps) => {
}
