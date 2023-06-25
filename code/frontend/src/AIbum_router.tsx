/**
 * @fileoverview 项目路由配置
 * */
import {createBrowserRouter, redirect} from "react-router-dom";
import {LoginView} from "./view/LoginView"
import { HomeView } from "./view/HomeView";
import { HomePage } from "./component/HomePage";
import { Album } from "./component/Album";
import { getUserAuth } from "./server/UserAuth";

const checkAuth= async ()=>{
    const auth = getUserAuth();
    if(!auth){
        return redirect("/login")
    }
}

const router=[
    {
        path:"/login",
        id:"login",
        element:<LoginView/>
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
            }
        ]
    }
]

export const AIbum_router =createBrowserRouter(router)