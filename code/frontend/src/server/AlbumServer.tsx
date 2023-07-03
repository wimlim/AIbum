
import exp from "constants";
import { defaultConfiguration,BackendAlbumProps, AlbumProps } from "../defaultConfiguration"

const {backendUrl,createAlbumPathName,getAlbumsPathName,getAlbumPathName,deleteAlbumPathName,albumDeletePhotoPathName,albumAddPhotoPathName} = defaultConfiguration;

export const createAlbum = (albumName:string)=>
{
    const url = backendUrl + createAlbumPathName;

    //post中的数据是在body中的，所以要先把数据转化为json格式,而GET是在param中

    return fetch(url,{
        method:'POST',
        body:JSON.stringify({
            userid:sessionStorage.getItem("userid"),
            albumname:albumName
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
}

interface GetAlbumProps{
    param:{}|undefined,
    callback:(data:AlbumProps[])=>void
}


export const getAlbums=(props:GetAlbumProps)=>{
    const {callback}=props;
    const url = backendUrl+getAlbumsPathName+"?userid="+sessionStorage.getItem("userid");
    fetch(url)
    .then((response)=>{
        if(response.status===404)
        {
            callback([]);
            throw new Error("404");
        }
        else return response.json();
    }
    ).then((data)=>{
        console.log(data)
        callback(data.map(
            (item:any)=>{
                return {
                    id:item.id,
                    name:item.name,
                    photos:item.photos
                } as AlbumProps
            }
        ));
    })
    .catch((error)=>{
        console.log(error);
    })
}

export const getAlbum=(id:string)=>
{
    const url = backendUrl+getAlbumPathName+"?albumid="+id+"&userid="+sessionStorage.getItem("userid");

    return fetch(url,{method:'GET'})
}

export const deleteAlbum=(id:string)=>
{
    const url = backendUrl +deleteAlbumPathName;
    return fetch(url,{
        method:'POST',
        body:JSON.stringify({
            userid:sessionStorage.getItem("userid"),
            albumid:id
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const albumAddPhotos=(albumId:number,photoIds:number[])=>
{
    const url = backendUrl + albumAddPhotoPathName;
    return fetch(url,{
        method:'POST',
        body:JSON.stringify({
            albumid:albumId,
            photosid:photoIds
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const albumDeletePhotos=(albumId:number,photoIds:number[])=>
{
    const url = backendUrl + albumDeletePhotoPathName;
    return fetch(url,{
        method:'POST',
        body:JSON.stringify({
            albumid:albumId,
            photosid:photoIds
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
}