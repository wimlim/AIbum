/**
 * @brief   首页
 * @desc    首页
 * @brief homepage按照上传时间展示所有图片
 */

import { Image, Space } from "antd"
import index from "../assets/img/index.png"
import { FolderProps, PictureProps } from "../test/test_photo";
import React, { useEffect } from "react";
import { getPictures } from "../server/PictureServer";

interface HomePageProps {
}

const HomePageStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
}

export const HomePage:React.FC<HomePageProps> =()=>{

    const [pictures,setPictures]=React.useState<PictureProps[]>([]);
    const [visible,setVisible]=React.useState<boolean>(false);
    const [selectPictureIndex,setSelectPictureIndex]=React.useState<number>(0);
    useEffect(()=>{
        getPictures(
            {
                param:{},
                callback:(data:PictureProps[])=>{setPictures(data)}
            }
        )
    },[]);

    const defaultHomePageContent=()=>
    {
        return (
            <div>
                <Image src={index} width={"70%"} preview={false}/>
                <h1>你的相册里还没有一张照片哦，快去上传吧!</h1>
            </div>
        )
    }

    const HomePageContentWithPictures=()=>
    {
        return(
            <div>
                <div>
                    {
                        pictures.map((picture,index)=>{
                            return(
                                <Image key={index} src={picture.url} preview={false} height={'200px'}
                                    onClick={()=>{setVisible(true);setSelectPictureIndex(index)}}
                                />
                            )
                        })
                    }
                </div>
                <div style={{display:'none'}}>
                    <Image.PreviewGroup preview={{visible,onVisibleChange:(vis)=>setVisible(vis),current:selectPictureIndex}}>
                        {pictures.map((picture,index)=>{return <Image key={index} src={picture.url}/>})}
                    </Image.PreviewGroup>
                </div>
            </div>
        )
    }

    console.log(pictures)

    if(pictures===undefined||pictures===null||pictures.length===0)
    return (
        <div style={HomePageStyle}>
            {defaultHomePageContent()}
        </div>
        
    )
    else return (
        <div>
            {HomePageContentWithPictures()}
        </div>
    )
}