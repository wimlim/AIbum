/**
 * @file UserAuth.tsx
 * @desc 用户权限
 * @brief using sessionStorage to store user auth instead of localStorage
 */

export const getUserAuth = () => {
    const userAuth = sessionStorage.getItem("userAuth")
    return userAuth === "true";
}

export const setUserAuth = (auth:boolean) => {
    sessionStorage.setItem("userAuth",auth.toString())
}