
export interface PictureProps{
    id:string,                      //图片id
    name:string,                    //图片名字
    url:string,                     //图片url
    time:Date,                    //图片上传时间
}

export interface FolderProps
{
    id:string,                      //文件夹id
    name:string,                    //文件夹名字
    time:string,                    //文件夹创建时间
    pictures:PictureProps[],        //文件夹内的图片
}

export const get_test_album:()=>FolderProps[] =()=>{
    const pictures:PictureProps[]=get_test_homepage();
    return [{
        id:"1",
        name:"1",
        time:"2023/06/16 05:26",
        pictures:pictures,
    }]
}

export const get_test_homepage:()=>PictureProps[] =()=>{
    const picture1:PictureProps={
        id:"1",
        name:"1",
        url:"https://cdn.pixabay.com/photo/2023/06/16/05/26/grassland-8066987_640.jpg",
        time:new Date("2023/06/16 05:26"),
    }

    const picture2:PictureProps={
        id:"2",
        name:"2",
        url:"https://cdn.pixabay.com/photo/2023/05/07/09/59/mountains-7976041_640.jpg",
        time:new Date("2023/05/07 09:59"),
    }

    const picture3:PictureProps={
        id:"3",
        name:"3",
        url:"https://cdn.pixabay.com/photo/2023/05/09/07/18/space-7980556_1280.jpg",
        time:new Date("2023/05/09 07:18"),
    }

    const picture4:PictureProps={
        id:"4",
        name:"4",
        url:"https://cdn.pixabay.com/photo/2023/06/15/02/38/fauna-8064270_1280.jpg",
        time:new Date("2023/06/15 02:38"),
    }

    const picture5:PictureProps={
        id:"5",
        name:"5",
        url:"https://lh3.googleusercontent.com/73tnXT026WNDnhAjV2BiodROzGmU7f6a-K8AF5bujR20ogKoxqXhqV-ozOfiH9HevlCn3AuXFQMSwD60HFFEf8LzFxsOU1inGa83upoGPUuPL-Cg1YM2VYckK4eU4F0eL_cArv4qgdr20LLrcmJlwrLwyQnls9fi7cuuKfdW3SkMJMiib5dH5Wuz5EPyX0WX-xJleFEK2jo2JmT1DvuHhLJgy8YSdrKIX04xRyFhdfH3JxhXW9A5ViB3SQVxBpXi6clwyP9uZr8IJNiwSE7xkjw4vE9gzKg5zrudvPce3KipRvXWUCrSlVOr_Qny558fnxLM4ca_3fPquQ_wmx8t9ZqN0XkdbOR_3TeVtRvM2uZrCMuBceopDhD_0BGp_57NIX6h50qsUVZTbzNHCTKVJI6OChW-GLFbmn_Mlh-H2JyTFlFg3VZthgfVQZ3DlgUJ6Hx0JtojZ1ds80QBOZkgCv_zPPEzepcStgaO0WMlw7cX56KPJNynTBnhBsYHo4mGEED08IbbkwdPA6mKdY28MrrotDWqBsYhLkQiW-uZp70u1tl5sOOdw0Zwe0oEPocYrQStHjL_HVX7RycWnF52_rD46jxdNo6Fa2tg3jPYkZZ1D5Q_IQeQCmI-m3nyafjr8rMHAG5Roi3IRMH2k758AXcA9QUtvjUI6K6v34e0hpf774bwN6kS4HlZNJAu7SZ8jtgh49-y812G2_za7cyRuODzBFJgINy8rmho2mMkE1RS5l97kImTIWKqzuWngqGhKYPA4R8a2bXNQm7EtiBwszRh4E6klqXVmbENSX55Yn_fVrYL5TPbOiTo0n5stA65-qj-6tqnOVGZWgAogthqIX-i6szeYEI8jewUb1ZWZSQzifhH2x0MMmdeRWLWiv0SJ0kfQHnUvdbXXK3iqHiSdrQWIjCjyJL-mE63vZPWPtha7wE=s250-k-rw-no",
        time:new Date("2023/06/15 02:38"),
    }

    return [picture1,picture2,picture3,picture4,picture5];
}
