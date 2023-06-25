/**
 * @fileoverview 项目路由配置
 * */
import {createBrowserRouter, redirect} from "react-router-dom";
import {LoginView} from "./view/LoginView"
import { HomeView } from "./view/HomeView";
import { HomePage } from "./component/HomePage";
import { Album } from "./component/Album";
import { getUserAuth } from "./server/UserAuth";
import { Settings } from "./component/Settings";
import { loadavg } from "os";
import { Help } from "./component/Help";

const checkAuth= async ()=>{
    const auth = getUserAuth();
    if(!auth){
        return redirect("/login")
    }
    else return null;
}

const checkLogin=async ()=>{
    const auth = getUserAuth();
    if(auth){
        return redirect("/index")
    }
    else return null;
}

const router=[
    {
        path:"/login",
        id:"login",
        element:<LoginView/>,
        loader:checkLogin,
    },
    {
        path:"/",
        id:"index",
        element:<HomeView/>,
        loader:checkAuth,
        children:[
            {
                path:"/index",
                id:"homepage",
                element:<HomePage/>,
                loader:checkAuth
            },
            {
                path:"/album",
                id:"album",
                element:<Album/>,
                loader:checkAuth,
            },
            {
                path:"/settings",
                id:"settings",
                element:<Settings/>,
                loader:checkAuth,
            },
            {
                path:"/help",
                id:"help",
                element:<Help/>,
                loader:checkAuth,
            }
        ]
    }
]

export const AIbum_router =createBrowserRouter(router)