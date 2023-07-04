import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AlbumProps} from "../../defaultConfiguration";
import emptyPlaceholder from "../../assets/img/empyPlaceholder.png"
import React from "react";
import { GlobalShareContext } from "../../utils/GlobalShareReducer";

interface AlbumCardProps{
    album:AlbumProps
}

export const AlbumCard:React.FC<AlbumCardProps> =(props)=>{
    const {album}=props;
    const navigate=useNavigate();
    const {state} = React.useContext(GlobalShareContext);
    const allPhotos=state.photo;
    return(
        <Card
            style={{width:300}}
            cover=<img alt={album.name} src={album.photos.length>0?`data:image/jpeg;base64,${allPhotos.find((value)=>value.id===album.photos[0])?.url}`:emptyPlaceholder} ></img>
            hoverable
            onClick= {()=>{navigate(`/album/${album.id}`)}}
        >
            <Card.Meta title={album.name} /*description={album.time.toDateString()}*//>
        </Card>
    )
}