/**
 * @fileoverview 项目路由配置
 * */
import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {LoginView} from "./view/loginView";

const router=[
    {
        path:"/login",
        element:<LoginView/>
    }
]

export const AIbum_router =createBrowserRouter(router)