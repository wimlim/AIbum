
import {FolderProps, PictureProps, get_test_album, get_test_homepage} from "../test/test_photo";

interface GetPicturesProps{
    param:{}|undefined,
    callback:(data:PictureProps[])=>void
}

export const getPictures=(props:GetPicturesProps)=>{
    const{param,callback}=props;

    callback(get_test_homepage());
}

interface GetFoldersProps{
    param:{}|undefined,
    callback:(data:FolderProps)=>void
}

export const getFolders=(props:GetFoldersProps)=>{
    const {param,callback}=props;
    callback(get_test_album());
}