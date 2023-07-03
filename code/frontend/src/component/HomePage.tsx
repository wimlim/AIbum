/**
 * @brief   首页
 * @desc    首页
 * @brief homepage按照上传时间展示所有图片
 */

import { Button, Image, Modal } from "antd"
import index from "../assets/img/index.png"
import React, { useEffect } from "react";
import { BackendPictureProps, PhotoProps } from "../defaultConfiguration";
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { type } from "os";
import { getPhotos } from "../server/PhotoServer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addPicture, setPictures } from "../picturesSlice";
import { DeletePicturesModal } from "./DeletePhotosModal";

interface HomePageProps {
}

interface HomePageLoaderDataProps
{
    pictures:PhotoProps[]
}

export const homepageLoader:LoaderFunction=async (props:LoaderFunctionArgs)=>{

    let pictures:PhotoProps[]=[];

    await getPhotos({}).then(
        (response)=>{
            console.log(response)   
            return response.json();
        }
    ).then(
        (data:BackendPictureProps[])=>{
            console.log(data)
            pictures= data.map(
                (picture)=>{
                    return {
                        id:picture.id,
                        name:picture.name,
                        url:picture.image_data,
                        time:new Date(picture.date),
                    } as PhotoProps
                } 
            )
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    )

    return new Response(
        JSON.stringify({pictures:pictures}),
    )

}

const homePageStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
}

const displayTime:(data:Date)=>string = (data:Date)=>
{
    const today = new Date();       //今天
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);//昨天
    const beforeYesterday = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);//前天
    console.log(typeof(data))
    if(today.getFullYear()===data.getFullYear()&&today.getMonth()===data.getMonth()&&today.getDate()===data.getDate())return "今天";
    else if(yesterday.getFullYear()===data.getFullYear()&&yesterday.getMonth()===data.getMonth()&&yesterday.getDate()===data.getDate())return "昨天";
    else if(beforeYesterday.getFullYear()===data.getFullYear()&&beforeYesterday.getMonth()===data.getMonth()&&beforeYesterday.getDate()===data.getDate())return "前天";
    else return data.getFullYear()+"年"+(data.getMonth()+1)+"月"+data.getDate()+"日";
}

export const HomePage:React.FC<HomePageProps> =(props)=>{

    const loaderData = useLoaderData() as string;
    const [pictures,setPictures]=React.useState<PhotoProps[]>(
        JSON.parse(loaderData).pictures.map(
            (picture:PhotoProps)=>{
                return {
                    id:picture.id,
                    name:picture.name,
                    url:picture.url,
                    time:new Date(picture.time),
                } as PhotoProps
            }
        )
    );
    const [visible,setVisible]=React.useState<boolean>(false);
    const [selectPictureIndex,setSelectPictureIndex]=React.useState<number>(0);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log(pictures)

    let length=0;
    for(let i=0;i<pictures.length;i++)
    {
        length+=pictures[i].url.length;
    }

    console.log(length)

    const emptyHomePageContent=()=>
    {
        return (
            <div>
                <Image src={index} width={"70%"} preview={false}/>
                <h1>你的相册里还没有一张照片哦，快去上传吧!</h1>
            </div>
        )
    }

    const displayPictures=()=>
    {   
        let DateMap:Map<string,PhotoProps[]> =new Map();
        pictures.forEach((picture,index)=>{
            const time = displayTime(picture.time);
            if(DateMap.has(time))
            {
                DateMap.get(time)?.push(picture);
            }
            else
            {
                DateMap.set(time,[picture]);
            }
        })
        console.log(DateMap)
        console.log(Array.from(DateMap))
        return(
            <div>
                {
                    Array.from(DateMap).map((value,index)=>{
                        return(
                            <div key={value[0]}>
                                <h1>{value[0]}</h1>
                                <div style={{display:"flex",flexWrap:"wrap"}}>
                                    {value[1].map((picture,index)=>{
                                        return(
                                            <div key={index} style={{margin:"10px"}}>
                                                <Image alt="Base64 Image" src={`data:image/jpeg;base64,${picture.url}`} height={200} preview={{visible:false,onVisibleChange:(vis)=>setVisible(vis)}} onClick={()=>setSelectPictureIndex(index)}/>
                                            </div>)})}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const homePageContentWithPictures=()=>
    {
        return(
            <div>
                <Button onClick={showModal}>删除图片</Button>
                <h1>你的所有照片</h1>
                <div>
                    {displayPictures()}
                </div>
                <div style={{display:'none'}}>
                    <Image.PreviewGroup preview={{visible,onVisibleChange:(vis)=>setVisible(vis),current:selectPictureIndex}}>
                        {pictures.map((picture,index)=>{return <Image placeholder key={index} src={`data:image/jpeg;base64,${picture.url}`}/>})}
                    </Image.PreviewGroup>
                </div>
                <DeletePicturesModal onOk={handleOk} onCancel={handleCancel} pictures={pictures} setPictures={setPictures} open={isModalOpen}/>
            </div>
        )
    }

    console.log(pictures)

    if(pictures===undefined||pictures===null||pictures.length===0)
    return (
        <div style={homePageStyle}>
            {emptyHomePageContent()}
        </div>
        
    )
    else return (
        <div>
            {homePageContentWithPictures()}
        </div>
    )
}