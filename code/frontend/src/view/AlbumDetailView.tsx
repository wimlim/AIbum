import { Layout } from "antd";
import { useLoaderData } from "react-router-dom"
import { AlbumDetailHeader } from "../component/AlbumDetail/AlbumDetialHeader";
import { AlbumDetailContent } from "../component/AlbumDetail/AlbumDetailContent";
import { AlbumProps } from "../defaultConfiguration";
import React from "react";


interface AlbumDetailViewProps {
}

export const AlbumDetailView: React.FC<AlbumDetailViewProps> = () => {


    const LoaderData = JSON.parse(useLoaderData() as string);

    console.log(LoaderData)

    const album = LoaderData as AlbumProps;

    console.log(album)
    return (
        <Layout>
            <AlbumDetailHeader album={album} />
            <AlbumDetailContent album={album} />
        </Layout>
    )
}