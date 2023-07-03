import { FileAddOutlined } from "@ant-design/icons"
import { Button, Checkbox, Image, Modal, Tooltip, message } from "antd"
import React, { useEffect } from "react";
import { AlbumProps, BackendPictureProps, PhotoProps } from "../../defaultConfiguration";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { getPhotos } from "../../server/PhotoServer";
import { albumAddPhotos } from "../../server/AlbumServer";

interface AlbumAddPictureProps {
    RightStyle: React.CSSProperties
    album: AlbumProps
    setAlbum:Function
}

export const AlbumAddPicture: React.FC<AlbumAddPictureProps> = (props) => {
    const { RightStyle,album,setAlbum} = props;
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [selectedPhotoIds, setSelectedPhotoIds] = React.useState<number[]>([]);
    const [allPhotos, setAllPhotos] = React.useState<PhotoProps[]>([]);

    useEffect(
        ()=>
        {
            getPhotos({}).then(
                (response)=>response.json()
            ).then(
                (data:BackendPictureProps[])=>{
                     setAllPhotos(data.map(
                        (picture)=>{
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
        },[]
    )

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log("selected pictures",selectedPhotoIds)

        albumAddPhotos(album.id,selectedPhotoIds).then(
            (response)=>{
                if(response.ok)
                {
                    message.success("添加成功");
                    setAlbum(
                        {
                            ...album,
                            photos:[...album.photos,...selectedPhotoIds]
                        }
                    )
                }
                else message.error("添加失败");
            }
        )
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log(allPhotos)

    const options = allPhotos.filter(
        (photo)=>!album.photos.some(   // 过滤掉已经在相册中的图片
            (albumPhoto)=>albumPhoto===photo.id
        )
    ).map(
        (photo)=>{
            return {
                label:<Image src={`data:image/jpeg;base64,${photo.url}`} preview={false} height={200}/>,
                value:photo.id
            }
        })

    console.log(options)

    return (
        <>
            <Tooltip title='添加图片'>
                <Button icon={<FileAddOutlined/>} style={RightStyle} shape='circle' size='large' onClick={showModal}/>
            </Tooltip>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} okText="添加" cancelText="取消" title="添加图片到相册">
                <Checkbox.Group options={options} onChange={(values:CheckboxValueType[])=>setSelectedPhotoIds(values as number[])}/>
            </Modal>
        </>
    )
}