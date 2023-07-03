import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload, UploadProps, message } from "antd"
import { defaultConfiguration } from "../defaultConfiguration";
import { loadAIbumCore } from "../core/AIbumCore";
import React from "react";
import { format } from "path";
interface UploadPictureProps {
}

const {backendUrl,uploadPathName} = defaultConfiguration

const addFacesAndTags = async (file:File)=>{
    return new Promise(async (resolve,reject)=>{
        const aibumCore = await loadAIbumCore();
        const faceNet = new aibumCore.FaceNet();
        const imageNet = new aibumCore.ImageNet();
        let file_reader = new FileReader();
        console.log("ready to load");   

        let res={tags:[],faces:[]}

        file_reader.onload = async function () {
            let data = new Uint8Array(file_reader.result as ArrayBuffer);

            // Copy image data to heap
            let heap = aibumCore._malloc(data.length * data.BYTES_PER_ELEMENT);
            aibumCore.HEAPU8.set(data, heap);

            const ab_image = new aibumCore.Image(heap, data.length);

            if (ab_image.valid()) {
                let tags = await imageNet.getTags(ab_image, 5);
                let faces = await faceNet.getFaces(ab_image);

                ab_image.delete(); // Delete image

                tags = await tags.toArray();
                faces = await faces.toArray();
                for (const face of faces)
                    face.feature = await face.feature.toArray();
                console.log("tags",tags)
                console.log("faces",faces)
                res.tags= tags.map((tag:any)=>tag.index)
                res.faces= faces.map((face:any)=>face.feature)

                resolve({
                    tags: res.tags,
                    faces: res.faces 
                })
            }
        };
        file_reader.readAsArrayBuffer(file);
        console.log("res in addTagsAndFaces",res)
    })
}

const props: UploadProps = {
    name: 'file',
    accept:'.jpg,.png,.jpeg',
    beforeUpload: async (file:any) => {
        //console.log("file",file)
        let myHeaders = new Headers();
        myHeaders.append("Cookie",document.cookie);
        let formdata = new FormData();
        formdata.append("file", file);
        formdata.append("userid",sessionStorage.getItem("userid")||"");


        addFacesAndTags(file).then(
            (data:any)=>
            {
                console.log(data)
                formdata.append("tags",JSON.stringify(data.tags))
                formdata.append("faces",JSON.stringify(data.faces))
                for(let key of formdata.keys()){
                    console.log(key,formdata.get(key))
                }
                let requestOptions:RequestInit = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };
                fetch(backendUrl+uploadPathName, requestOptions)
                .then(response => {
                    if(response.status===200)return response.text();
                    else if(response.status === 404)throw new Error("未连接到服务器")
                    else throw new Error("上传失败")
                })
                .then(()=>
                {
                    message.success("上传成功")
                    setTimeout(()=>window.location.reload(),1000)
                })
                .catch(error => {console.log('error', error);message.error(error.message);});
            }
        )

        
        return false;
    },
    showUploadList:false
  };

export const UploadPicture: React.FC<UploadPictureProps> = () => {

    /*const [file,setFile] = React.useState<File>()
    const [readyToUpload,setReadyToUpload] = React.useState<boolean>(false)

    const props:UploadProps={
        name: 'file',
        accept:'.jpg,.png,.jpeg',
        beforeUpload:(file:any)=>{
            console.log(file)
            return false;
        }
    }*/

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined/>}  size ='large'>
                    上传图片
            </Button>
        </Upload>
    )
}