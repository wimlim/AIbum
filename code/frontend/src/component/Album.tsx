/**
 * @file Album.tsx
 * @desc 相册
 * @brief album按照文件夹展示所有图片
 */

import React, { useEffect } from "react";
import { getFolders } from "../server/PictureServer";
import emptyAlbum from "../assets/img/emptyAlbum.png"
import { Button, Divider, Image,} from "antd";
import { AlbumCard } from "./AlbumCard";
import { Link } from "react-router-dom";
import { BackendAlbumProps } from "../defaultConfiguration";

interface AlbumComponentProps {
}

const emptyAlbumContentStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    flexDirection:"column"
}

export const Album:React.FC<AlbumComponentProps> =()=>{
    
    const [albums,setAlbums]=React.useState<BackendAlbumProps[]>([]);

    useEffect(()=>{
        getFolders(
            {
                param:{},
                callback:(data:BackendAlbumProps[])=>setAlbums(data)
            }
        )
    },[])

    const createAlbum:()=>void =()=>
    {

    }

    const emptyAlbumContent=()=>
    {
        return (
            <div style={emptyAlbumContentStyle}>
                <Image src={emptyAlbum} preview={false} width='40%'/>
                <Button type="primary">
                    创建相册
                </Button>
                <h1>你创建的相册会在这里显示</h1>
            </div>
        )
    }
    
    const albumContent=()=>
    {
        return(
            <div>
                {
                    albums.map((album: BackendAlbumProps)=><AlbumCard album={album}/>)
                }
            </div>
        )
    }

    const albumHeader=()=>
    {
        return(
            <div>
                <div>
                    <h1 style={{float:"left"}}>相册</h1>
                    <Button type="primary" onClick={createAlbum} style={{float:'right'}}>创建相册</Button>
                </div>
                <Divider/>
            </div>
        )
    }

    return(
        <div>
            {albumHeader()}
            {albums.length===0?emptyAlbumContent():albumContent()}
        </div>
    )
}