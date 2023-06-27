import { Layout } from "antd";
import { useLoaderData } from "react-router-dom"
import { AlbumDetailHeader } from "../component/AlbumDetail/AlbumDetialHeader";
import { AlbumDetailContent } from "../component/AlbumDetail/AlbumDetailContent";
import { AlbumProps } from "../test/test_photo";
import React from "react";

interface AlbumDetailViewProps {
}

interface AlbumDetailLoaderDataProps {
    album:AlbumProps
}

export const AlbumDetailView: React.FC<AlbumDetailViewProps> = () => {

    const {album} = useLoaderData() as AlbumDetailLoaderDataProps;

    console.log(album)
    console.log(album.name)
    return (
        <Layout>
            <AlbumDetailHeader/>
            <AlbumDetailContent album={album}/>
        </Layout>
    )
}