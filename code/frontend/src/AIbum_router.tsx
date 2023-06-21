/**
 * @fileoverview 项目路由配置
 * */
import {createBrowserRouter} from "react-router-dom";
import {LoginView} from "./view/loginView";
import path from "path";

const router=[
    {
        path:"/login",
        id:"login",
        element:<LoginView/>
    },
    {
        path:"/",
        id:"index",
        
    }
]

export const AIbum_router =createBrowserRouter(router)