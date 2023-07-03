
//import {AlbumProps, PictureProps, get_test_album, get_test_homepage} from "../test/test_photo";

import {BackendAlbumProps,defaultConfiguration} from "../defaultConfiguration";

type AlbumProps = BackendAlbumProps;

const configuration = defaultConfiguration;

const {backendUrl,getPhotosPathName: getPicturesPathName,deletePhotoPathName: deletePicturePathName} = configuration;

interface GetPhotoProps{
}

/**
 * 
 * @param props 
 * @brief 一次拿完所有的照片
 */


export const getPhotos=(props:GetPhotoProps)=>{

    const url = backendUrl+getPicturesPathName+"?userid="+sessionStorage.getItem("userid");
    console.log(url);
    return fetch(url,{
        method:'GET',
        headers:{
            'Content-Type':'image/jpeg'
        }
    }
    )
}

interface DeletePhotosProps{
    pictureIds:number[]
}

export const deletePhotos=(props:DeletePhotosProps)=>
{
    const {pictureIds} = props;
    const url = backendUrl+ deletePicturePathName;

    return fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            photos:pictureIds,
        })
    })
}
