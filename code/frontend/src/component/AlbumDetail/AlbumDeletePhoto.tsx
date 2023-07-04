import React from "react";
import { AlbumProps,} from "../../defaultConfiguration";
import { albumDeletePhotos } from "../../server/AlbumServer";
import { Button, Modal, Tooltip, message,Checkbox,Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { GlobalShareContext } from "../../utils/GlobalShareReducer";

interface AlbumDeletePhotoProps {
    RightStyle: React.CSSProperties
    album: AlbumProps
    setAlbum:Function
}

export const AlbumDeletePhoto: React.FC<AlbumDeletePhotoProps> = (props) => {

    const { RightStyle,album } = props;
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [selectedPhotoIds, setSelectedPhotoIds] = React.useState<number[]>([]);
    const {state} = React.useContext(GlobalShareContext);
    const allPhotos=state.photo;


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log("selected pictures",selectedPhotoIds)

        albumDeletePhotos(album.id,selectedPhotoIds).then(
            (response)=>{
                if(response.ok)
                {
                    message.success("删除成功");
                    let tmp=[];
                    for(let i=0;i<album.photos.length;i++)
                    {
                        if(!selectedPhotoIds.includes(album.photos[i]))tmp.push(album.photos[i]);
                    }
                    props.setAlbum({...album,photos:tmp});
                }
                else message.error("删除失败");
            }
        )
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const options = allPhotos.filter(
        (photo)=>album.photos.some(
            (albumPhoto)=>albumPhoto===photo.id
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