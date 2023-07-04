
export interface defaultConfigurationType
{
    backendUrl:string;                          //后端网址
    registerPathName:string;                    //注册路径
    loginPathName:string;                       //登录路径
    uploadPathName:string;                      //上传路径
    getPhotosPathName:string;                 //获取图片路径
    getAlbumsPathName:string;                   //获取相册(全部)路径
    getAlbumPathName:string;                    //获取相册(单个)路径
    createAlbumPathName:string;                 //创建相册路径
    deleteAlbumPathName:string;                 //删除相册路径
    deletePhotoPathName:string;               //删除图片路径
    albumAddPhotoPathName:string;             //相册添加图片路径
    albumDeletePhotoPathName:string;          //相册删除图片路径
    getTagsAlbumPathName:string;                //获取标签相册路径
    getFacesAlbumPathName:string;               //获取人脸相册路径
    profileEditPathName:string;                 //修改用户信息路径
}   

export interface BackendPictureProps{
    id:number;                                  //图片id
    name:string;                                //图片名
    image_data:string;                          //图片数据
    date:string;                                //图片上传时间
    content_type:string;                        //图片类型
}

export interface PhotoProps{
    id:number;                                  //图片id    
    name:string;                                //图片名
    url:string;                                 //图片url?(暂定url)
    time:Date;                                  //图片上传时间
}

export interface BackendAlbumProps{
    id:number;                                  //相册id
    name:string;                                //相册名
    //time:Date;                                 //相册创建时间
    photos:PhotoProps[];                            //相册内图片id
}

export interface AlbumProps{
    id:number;                                  //相册id
    name:string;                                //相册名
    photos:number[];                            //相册内图片
}

export interface BackendUserAuthProps{
    account:string;                             //用户账号
    password:string;                            //用户密码
}

export interface BackendUserInfoProps{
    username:string;                                //用户名
    userid:number;                                  //用户id
    email:string;                               //用户邮箱
}

export const defaultConfiguration:defaultConfigurationType = {
    backendUrl:'http://127.0.0.1:8000/',
    registerPathName:'register/',
    loginPathName:'login/',
    uploadPathName:'upload/',
    getPhotosPathName:'getPictures/',
    getAlbumsPathName:'album/',
    getAlbumPathName:'album/get',
    createAlbumPathName:'album/create',
    deleteAlbumPathName:'album/delete',
    albumAddPhotoPathName:'album/add',
    deletePhotoPathName:'delete/',
    albumDeletePhotoPathName:'album/delete/picture',
    getTagsAlbumPathName:'album/getTags',
    getFacesAlbumPathName:'album/getFaces',
    profileEditPathName:'profile/edit',
}