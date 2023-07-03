/**
 * @file Album.tsx
 * @desc 相册
 * @brief album按照文件夹展示所有图片
 */

import React, { useEffect } from "react";
import { getAlbums, getTagsAlbum } from "../../server/AlbumServer";
import emptyAlbum from "../../assets/img/emptyAlbum.png"
import { Button, Divider, Form, Image, Modal, Space, message,} from "antd";
import { AlbumCard } from "./AlbumCard";
import { Link } from "react-router-dom";
import { BackendAlbumProps,AlbumProps } from "../../defaultConfiguration";
import { createAlbum } from "../../server/AlbumServer";
import Input from "antd/lib/input";

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
    
    const [albums,setAlbums]=React.useState<AlbumProps[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    console.log("albums",albums);
    useEffect(()=>{
        console.log("useEffect")
        getAlbums(
            {
                param:{},
                callback:(data:BackendAlbumProps[])=>setAlbums(data.map(
                    (album)=>{
                        return {
                            id:album.id,
                            name:album.name,
                            photos:album.photos.map((value:any)=>value.id as number)
                        } as AlbumProps
                    }
                ))
            }
        )
    },[])

    const createAlbumDialog=()=>
    {
        return (
            <Modal 
                title="创建相册"
                open={isModalOpen}
                footer={null}
                onCancel={()=>setIsModalOpen(false)}
            >
                <Form
                    onFinish={(values)=>{
                        console.log(values);
                        createAlbum(values.albumName)
                        .then((response)=>{
                            if(response.status===200)
                            {
                                messageApi.success("创建成功");
                                setIsModalOpen(false);
                                values.albumName="";
                                window.location.reload();
                            }
                            else
                            {
                                messageApi.error("创建失败");
                            }
                        })
                    }}
                >
                    <Form.Item name='albumName'>
                        <Input placeholder="相册名"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    const emptyAlbumContent=()=>
    {
        return (
            <div style={emptyAlbumContentStyle}>
                <Image src={emptyAlbum} preview={false} width='40%'/>
                <Button type="primary" onClick={showModal}>
                    创建相册
                </Button>
                <h1>你创建的相册会在这里显示</h1>
            </div>
        )
    }
    
    const albumContent=()=>
    {
        return(
            <Space>
                {
                    albums.map((album: AlbumProps,index)=><AlbumCard album={album} key={index}/>)
                }
            </Space>
        )
    }

    const clickTagsAlbum=()=>
    {
        console.log("click tags album");
        getTagsAlbum().then(
            (response)=>{
                if(response.ok)
                {
                    console.log(response);
                    setTimeout(()=>window.location.reload(),1000)

                }
                return response.json();
            }
        )
    }

    const clickFaceAlbum=()=>
    {
        console.log("click face album");
        getTagsAlbum().then(
            (response)=>{
                if(response.ok)
                {
                    console.log(response);
                    setTimeout(()=>window.location.reload(),1000)

                }
                return response.json();
            }
        )
    }


    const albumHeader=()=>
    {
        return(
            <div>
                <div>
                    <h1 style={{float:"left"}}>相册</h1>
                    <Button type="primary" onClick={showModal} style={{float:'right'}}>创建相册</Button>
                    <Button type="primary" style={{float:'right',marginRight:'10px'}} onClick={clickTagsAlbum}>图像分类</Button>
                    <Button type="primary" style={{float:'right',marginRight:'10px'}} onClick={clickFaceAlbum}>人脸聚类</Button>
                </div>
                <Divider/>
            </div>
        )
    }

    return(
        <div>
            {contextHolder}
            {albumHeader()}
            {albums.length===0?emptyAlbumContent():albumContent()}
            {createAlbumDialog()}
        </div>
    )
}