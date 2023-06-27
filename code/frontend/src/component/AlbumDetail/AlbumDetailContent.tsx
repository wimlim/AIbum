
import React from 'react';
import {Image} from 'antd';
import { Layout } from 'antd';
import { FolderProps } from '../../test/test_photo';

interface AlbumDetailContentProps {
    album:FolderProps
}

const AlbumDetailContentStyle:React.CSSProperties = {
    backgroundColor:"white",
}

export const AlbumDetailContent: React.FC<AlbumDetailContentProps> = (props) => {

    const {album}=props;

    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
    const [visible, setVisible] = React.useState<boolean>(false);

    console.log(album)

    const emptyContent=()=>
    {
        return (
            <div>
            </div>
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
                        album.pictures.map((picture,index)=>{
                            return (
                                <div style={{margin:'10px'}}>
                                    <Image
                                    key={index}
                                    height={400}
                                    src={picture.url}
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
                            album.pictures.map((picture,index)=>{
                                return (
                                    <Image
                                        key={index}
                                        src={picture.url}
                                    />
                                )
                            })
                        }
                    </Image.PreviewGroup>
                </div>
            </Layout.Content>
        )
    }

    return album===undefined||album.pictures===undefined?emptyContent():content();

}