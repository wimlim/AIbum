import { Card } from "antd";
import { FolderProps } from "../test/test_photo";
import { Link, useNavigate } from "react-router-dom";

interface AlbumCardProps{
    album:FolderProps
}

export const AlbumCard:React.FC<AlbumCardProps> =(props)=>{
    const {album}=props;
    const navigate=useNavigate();
    return(
        <Card
            style={{width:300}}
            cover=<img alt={album.name} src={album.pictures[0].url}></img>
            hoverable
            onClick= {()=>{navigate(`/album/${album.id}`)}}
        >
            <Card.Meta title={album.name} description={album.time}/>
        </Card>
    )
}