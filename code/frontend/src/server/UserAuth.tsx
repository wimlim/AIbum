/**
 * @file UserAuth.tsx
 * @desc 用户权限
 */

export const getUserAuth = () => {
    const userAuth = localStorage.getItem("userAuth")
    return userAuth === "true";
}

export const setUserAuth = (auth:boolean) => {
    localStorage.setItem("userAuth",auth.toString())
}