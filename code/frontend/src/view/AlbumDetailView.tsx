import { Layout } from "antd";
import { useLoaderData } from "react-router-dom"
import { AlbumDetailHeader } from "../component/AlbumDetail/AlbumDetialHeader";
import { AlbumDetailContent } from "../component/AlbumDetail/AlbumDetailContent";
import { AlbumProps, BackendAlbumProps } from "../defaultConfiguration";
import React from "react";


interface AlbumDetailViewProps {
}

export const AlbumDetailView: React.FC<AlbumDetailViewProps> = () => {

    const loaderData=JSON.parse(useLoaderData() as string) as BackendAlbumProps;
    console.log("ALbumDetailView loaderData",loaderData)
    const [album, setAlbum] = React.useState<AlbumProps>({
        id:loaderData.id,
        name:loaderData.name,
        photos:loaderData.photos.map((value:any)=>value.id as number)
    });
    console.log("album",album)
    return (
        <Layout>
            <AlbumDetailHeader album={album} setAlbum={setAlbum}/>
            <AlbumDetailContent album={album} />
        </Layout>
    )
}