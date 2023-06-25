/**
 * @brief   首页
 * @desc    首页
 */

import { Image } from "antd"
import index from "../assets/img/index.png"

interface HomePageProps {
}

const HomePageStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
}

export const HomePage:React.FC<HomePageProps> =()=>{

    const defaultHomePageContent=()=>
    {
        return (
            <div>
                <Image src={index} width={"70%"} preview={false}/>
                <h1>你的相册里还没有一张照片哦，快去上传吧</h1>
            </div>
        )
    }

    return (
        <div style={HomePageStyle}>
            {defaultHomePageContent()}
        </div>
        
    )
}