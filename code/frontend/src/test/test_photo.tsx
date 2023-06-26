
export interface PictureProps{
    id:string,                      //图片id
    name:string,                    //图片名字
    url:string,                     //图片url
    time:string,                    //图片上传时间
}

export interface FolderProps
{
    id:string,                      //文件夹id
    name:string,                    //文件夹名字
    time:string,                    //文件夹创建时间
    pictures:PictureProps[],        //文件夹内的图片
    folders:FolderProps[],          //文件夹内的文件夹
}

export const get_test_album:()=>FolderProps =()=>{
    const picture1:PictureProps={
        id:"1",
        name:"1",
        url:"https://cdn.pixabay.com/photo/2023/05/09/07/18/space-7980556_1280.jpg",
        time:"1",
    }

    const picture2:PictureProps={
        id:"2",
        name:"2",
        url:"https://cdn.pixabay.com/photo/2023/06/15/02/38/fauna-8064270_1280.jpg",
        time:"2",
    }

    const picture3:PictureProps={
        id:"3",
        name:"3",
        url:"https://cdn.pixabay.com/photo/2023/05/07/09/59/mountains-7976041_640.jpg",
        time:"3",
    }

    const emptyFolder:FolderProps={
        id:"1",
        name:"1",
        time:"1",
        pictures:[],
        folders:[],
    }

    const folderWithOnePicture:FolderProps={
        id:"2",
        name:"2",
        time:"2",
        pictures:[picture1],
        folders:[],
    }

    const folderWithOnePictureAndOneFolder:FolderProps={
        id:"3",
        name:"3",
        time:"3",
        pictures:[picture2],
        folders:[emptyFolder],
    }

    const folderWithOnePictureAndTwoFolder:FolderProps={
        id:"4",
        name:"4",
        time:"4",
        pictures:[picture3],
        folders:[folderWithOnePicture,folderWithOnePictureAndOneFolder],
    }

    return folderWithOnePictureAndTwoFolder;
}

export const get_test_homepage:()=>PictureProps[] =()=>{
    const picture1:PictureProps={
        id:"1",
        name:"1",
        url:"https://cdn.pixabay.com/photo/2023/06/16/05/26/grassland-8066987_640.jpg",
        time:"1",
    }

    const picture2:PictureProps={
        id:"2",
        name:"2",
        url:"https://cdn.pixabay.com/photo/2023/05/07/09/59/mountains-7976041_640.jpg",
        time:"2",
    }

    return [picture1,picture2];
}
