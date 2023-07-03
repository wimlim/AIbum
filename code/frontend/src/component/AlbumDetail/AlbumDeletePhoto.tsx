import React, { useEffect } from "react";
import { AlbumProps, BackendPictureProps, PhotoProps } from "../../defaultConfiguration";
import { getPhotos } from "../../server/PhotoServer";
import { albumDeletePhotos } from "../../server/AlbumServer";
import { Button, Modal, Tooltip, message,Checkbox,Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { setInterval } from "timers/promises";

interface AlbumDeletePhotoProps {
    RightStyle: React.CSSProperties
    album: AlbumProps
}

export const AlbumDeletePhoto: React.FC<AlbumDeletePhotoProps> = (props) => {

    const { RightStyle,album } = props;

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
                    ))}
            )},[])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log("selected pictures",selectedPhotoIds)

        albumDeletePhotos(album.id,selectedPhotoIds).then(
            (response)=>{
                if(response.ok)message.success("删除成功");
                else message.error("删除失败");
            }
        ).then(
            ()=>{
                setTimeout(()=>window.location.reload(),1000)
            }
        )
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const options = allPhotos.filter(
        (photo)=>album.photos.some(
            (albumPhoto)=>albumPhoto.id===photo.id
        )
    ).map(
        (photo)=>{
            return {
                label:<Image src={`data:image/jpeg;base64,${photo.url}`} preview={false} height={200}/>,
                value:photo.id
            }
        })

    console.log(allPhotos)

    return (
        <>
            <Tooltip title='移除图片'>
                    <Button icon={<DeleteOutlined/>} style={RightStyle} shape='circle' size='large' onClick={showModal}/>
            </Tooltip>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                title="移除图片"
                okText="确认"
                cancelText="取消"
            >
                <Checkbox.Group options={options} onChange={(values:CheckboxValueType[])=>setSelectedPhotoIds(values as number[])}/>
            </Modal>
        </>
    )
}