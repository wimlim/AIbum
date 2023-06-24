/**
 * @fileoverview 项目路由配置
 * */
import {createBrowserRouter} from "react-router-dom";
import {LoginView} from "./view/LoginView"
import { HomeView } from "./view/HomeView";
import { HomePage } from "./component/HomePage";
import { Album } from "./component/Album";

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
        children:[
            {
                path:"/index",
                id:"homepage",
                element:<HomePage/>
            },
            {
                path:"/album",
                id:"album",
                element:<Album/>
            }
        ]
    }
]

export const AIbum_router =createBrowserRouter(router)