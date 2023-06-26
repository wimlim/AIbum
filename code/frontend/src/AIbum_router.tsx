/**
 * @fileoverview 项目路由配置
 * */
import {LoaderFunction, LoaderFunctionArgs, RouteObject, createBrowserRouter, redirect} from "react-router-dom";
import {LoginView} from "./view/LoginView"
import { HomeView } from "./view/HomeView";
import { HomePage } from "./component/HomePage";
import { Album } from "./component/Album";
import { getUserAuth } from "./server/UserAuth";
import { Settings } from "./component/Settings";
import { Help } from "./component/Help";
import { Tool } from "./component/Tool";
import { FolderProps } from "./test/test_photo";
import { get } from "http";
import { getFolders } from "./server/PictureServer";
import { AlbumDetailView } from "./view/AlbumDetailView";

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

const albumDetailLoader:LoaderFunction=(props:LoaderFunctionArgs)=>{

    //authority
    const auth = getUserAuth();
    if(!auth)return redirect("/login")

    const {params}=props;
    const {id}=params;
    let albums:FolderProps[]=[];
    getFolders({
        param:{},
        callback:(data:FolderProps[])=>{
            albums=data;
        }
    })
    const album=albums[0]
    return new Response(
        JSON.stringify({album:album}),
        {
            headers:{"content-type":"application/json"},
            status:200
        });
}

const router:RouteObject[]=[
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
            },
            {
                path:"/albums",
                id:"albums",
                element:<Album/>,
            },
            {
                path:"/settings",
                id:"settings",
                element:<Settings/>,
            },
            {
                path:"/help",
                id:"help",
                element:<Help/>,
            },
            {
                path:"/tool",
                id:"tool",
                element:<Tool/>,
            },
            
        ]
    },
    {
        path:"/album/:id",
        id:"album",
        element:<AlbumDetailView/>,
        loader:albumDetailLoader,
    },

]

export const AIbum_router =createBrowserRouter(router)