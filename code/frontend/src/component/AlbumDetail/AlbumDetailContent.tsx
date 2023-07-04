
import React from 'react';
import {Image} from 'antd';
import { Layout } from 'antd';
import { AlbumProps} from '../../defaultConfiguration';
import { GlobalShareContext } from '../../utils/GlobalShareReducer';

interface AlbumDetailContentProps {
    album:AlbumProps
}

const AlbumDetailContentStyle:React.CSSProperties = {
    backgroundColor:"white",
}

export const AlbumDetailContent: React.FC<AlbumDetailContentProps> = (props) => {

    const {album}=props;

    console.log(album)

    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
    const [visible, setVisible] = React.useState<boolean>(false);

    const {state} = React.useContext(GlobalShareContext);
    const allPhotos=state.photo;

    console.log(allPhotos)

    const displayPhoto = allPhotos.filter((photo)=>{
        return album.photos.some((albumPhoto)=>{
            return albumPhoto===photo.id;
        })
    })

    console.log(displayPhoto)

    const emptyContent=()=>
    {
        return (
            <Layout.Content style={AlbumDetailContentStyle}>
               <div style={{display:'flex',textAlign:'center',justifyContent:'center'}}>
                    <h1>{album.name}</h1>
                </div>
                <div style={{display:'flex',textAlign:'center',justifyContent:'center'}}>
                    <h1>你的相册里还没有任何照片哦</h1>
                </div>
            </Layout.Content>
        )
    }

    const content=()=>
    {
        return (
            <Layout.Content style={AlbumDetailContentStyle}>
                <div style={{display:'flex',textAlign:'center',justifyContent:'center'}}>
                    <h1>{album.name}</h1>
                </div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {
                        displayPhoto.map((photo,index)=>{
                            return (
                                <div style={{margin:'10px'}}>
                                    <Image
                                    key={index}
                                    height={200}
                                    src={`data:image/jpeg;base64,${photo.url}`}
                                    onClick={()=>{
                                        setSelectedIndex(index);
                                    }}
                                    preview={{visible:false,onVisibleChange:(vis)=>setVisible(vis)}}
                                    
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{display:'none'}}>
                    <Image.PreviewGroup preview={{visible,onVisibleChange:(vis)=>setVisible(vis),current:selectedIndex}}>
                        {
                            displayPhoto.map((photo,index)=>{
                                return (
                                    <Image
                                        key={index}
                                        src={`data:image/jpeg;base64,${photo.url}`}
                                    />
                                )
                            })
                        }
                    </Image.PreviewGroup>
                </div>
            </Layout.Content>
        )
    }

    if(album.photos.length===0)
    {
        return emptyContent();
    }
    else return content();

}