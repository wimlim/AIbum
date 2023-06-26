import { Card } from "antd";
import { FolderProps } from "../test/test_photo";

interface AlbumCardProps{
    album:FolderProps
}

export const AlbumCard:React.FC<AlbumCardProps> =(props)=>{
    const {album}=props;
    return(
        <Card
            style={{width:300}}
            cover=<img alt={album.name} src={album.pictures[0].url}></img>
            hoverable
        >
            <Card.Meta title={album.name} description={album.time}/>
        </Card>
    )
}