interface ConfigurationType
{
    backendUrl:string;                          //后端网址
    registerPathName:string;                    //注册路径
    loginPathName:string;                       //登录路径
    uploadPathName:string;                      //上传路径
    getPicturesPathName:string;                 //获取图片路径
    getAlbumsPathName:string;                   //获取相册路径
}   

interface BackendPictureProps{
    id:number;                                  //图片id    
    name:string;                                //图片名
    url:string;                                 //图片url?(暂定url)
    time:Date;                                  //图片上传时间
}

interface BackendAlbumProps{
    id:number;                                  //相册id
    name:string;                                //相册名
    time:Date;                                  //相册创建时间
    pictures:BackendPictureProps[];             //相册内图片
}

interface BackendUserProps{
    account:string;                             //用户账号
    password:string;                            //用户密码
}

export const defaultConfiguration:ConfigurationType = {
    backendUrl:'',
    registerPathName:'',
    loginPathName:'',
    uploadPathName:'',
    getPicturesPathName:'',
    getAlbumsPathName:'',
}