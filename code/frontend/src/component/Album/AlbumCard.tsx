import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AlbumProps, BackendPictureProps, PhotoProps } from "../../defaultConfiguration";
import emptyPlaceholder from "../../assets/img/empyPlaceholder.png"
import React, { useEffect } from "react";
import { getPhotos } from "../../server/PhotoServer";
import { error } from "console";

interface AlbumCardProps{
    album:AlbumProps
}

export const AlbumCard:React.FC<AlbumCardProps> =(props)=>{
    const [allPhotos,setAllPhotos]=React.useState<PhotoProps[]>([]);
    const {album}=props;
    const navigate=useNavigate();

    useEffect(
        ()=>
        {
            getPhotos({}).then(
                (response)=>
                {
                    console.log(response)
                    if(!response.ok&&response.statusText==='Not Found')throw new Error("没有图片")
                    return response.json()
                }
            ).then(
                (data)=>{
                    setAllPhotos(data.map(
                        (picture:BackendPictureProps)=>{
                            return {
                                id:picture.id,
                                name:picture.name,
                                url:picture.image_data,
                                time:new Date(picture.date),
                            } as PhotoProps
                        } 
                    ))
                }
            )
            .catch((error)=>message.error(error.message))
        },[]
    )

    return(
        <Card
            style={{width:300}}
            cover=<img alt={album.name} src={album.photos.length>0?`data:image/jpeg;base64,${allPhotos.find((value)=>value.id===album.photos[0])?.url}`:emptyPlaceholder} ></img>
            hoverable
            onClick= {()=>{navigate(`/album/${album.id}`)}}
        >
            <Card.Meta title={album.name} /*description={album.time.toDateString()}*//>
        </Card>
    )
}