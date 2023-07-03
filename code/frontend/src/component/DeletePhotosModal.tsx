import { Modal ,Image,Checkbox, message} from "antd";
import { PhotoProps } from "../defaultConfiguration";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React from "react";
import { deletePhotos } from "../server/PhotoServer";

interface DeletePicturesModalProps {
    onOk:()=>void;
    onCancel:()=>void;
    pictures:PhotoProps[];
    setPictures:(pictures:PhotoProps[])=>void;
    open:boolean;
}

export const DeletePicturesModal: React.FC<DeletePicturesModalProps> = (props) => {
    const {onOk,onCancel,pictures,setPictures,open}=props;

    const [selectedPictures, setSelectedPictures] = React.useState<number[]>([]);

    const options = pictures.map(
        (picture)=>{
            return {
                label:<Image src={`data:image/jpeg;base64,${picture.url}`} preview={false} height={200}/>,
                value:picture.id,
            }
        })

    return (
        <Modal 
            open={open} 
            onOk={
                ()=>
                {
                    console.log(selectedPictures)
                    const newPictures=pictures.filter((picture)=>!selectedPictures.includes(picture.id));
                    setPictures(newPictures);
                    deletePhotos({pictureIds:selectedPictures}).then(
                        (response)=>{
                            if(response.ok)
                            {
                                message.success("删除成功");
                            }else message.error("删除失败");
                        }
                    )
                    onOk();
                }
            } 
            onCancel={onCancel} 
            title='删除图片' 
            okText='删除'
            cancelText='取消'
            width={1000}
        >
            <Checkbox.Group options={options} onChange={(values:CheckboxValueType[])=>setSelectedPictures(values as number[])}/>
        </Modal>
    )
}
