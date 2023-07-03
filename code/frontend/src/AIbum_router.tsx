/**
 * @fileoverview 项目路由配置
 * */
import {LoaderFunction, LoaderFunctionArgs, RouteObject, createBrowserRouter, redirect} from "react-router-dom";
import {LoginView} from "./view/LoginView"
import { HomeView } from "./view/HomeView";
import { HomePage } from "./component/HomePage";
import { Album } from "./component/Album/Album";
import { getUserAuth } from "./server/UserAuth";
import { Settings } from "./component/Settings";
import { Help } from "./component/Help";
import { Tool } from "./component/Tool";
import { AlbumProps, BackendAlbumProps, BackendPictureProps, PhotoProps } from "./defaultConfiguration";
import { getPhotos } from "./server/PhotoServer";
import { AlbumDetailView } from "./view/AlbumDetailView";
import {homepageLoader} from "./component/HomePage"
import { type } from "os";
import { getAlbum} from "./server/AlbumServer";

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

const albumDetailLoader:LoaderFunction=async (props:LoaderFunctionArgs)=>{

    //authority
    const auth = getUserAuth();
    if(!auth)return redirect("/login")

    const {params}=props;
    const {id}=params;
    let album:AlbumProps|null=null;
    if(id===undefined)return redirect("/album")
    await getAlbum(id).then((res)=>{console.log(res);return res.json();})
    .then((data)=>{console.log(data);album = {id:parseInt(id),name:data.name,photos:data.photos} as AlbumProps;})
    .catch((err)=>{console.log(err)})
    console.log(album)
    return new Response(JSON.stringify(album),{status:200})
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
                loader:homepageLoader,
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