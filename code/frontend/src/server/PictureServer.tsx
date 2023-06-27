
//import {AlbumProps, PictureProps, get_test_album, get_test_homepage} from "../test/test_photo";

import {BackendAlbumProps, BackendPictureProps,defaultConfiguration} from "../defaultConfiguration";

type PictureProps = BackendPictureProps;
type AlbumProps = BackendAlbumProps;

const configuration = defaultConfiguration;

const {backendUrl,getPicturesPathName,getAlbumsPathName} = configuration;

interface GetPicturesProps{
    param:{}|undefined,
    callback:(data:PictureProps[])=>void
}

export const getPictures=(props:GetPicturesProps)=>{
    const{param,callback}=props;

    const url = backendUrl+getPicturesPathName;
    fetch(url)
    .then((response)=>{
        return response.json();
    }
    ).then((data)=>{
        callback(data);
    })
    .catch((error)=>{
        console.log(error);
    })
}

interface GetAlbumProps{
    param:{}|undefined,
    callback:(data:AlbumProps[])=>void
}

export const getFolders=(props:GetAlbumProps)=>{
    const {param,callback}=props;
    const url = backendUrl+getAlbumsPathName;
    fetch(url)
    .then((response)=>{
        return response.json();
    }
    ).then((data)=>{
        callback(data);
    })
    .catch((error)=>{
        console.log(error);
    })
}