import { Layout } from "antd";
import { useLoaderData } from "react-router-dom"
import { AlbumDetailHeader } from "../component/AlbumDetail/AlbumDetialHeader";
import { AlbumDetailContent } from "../component/AlbumDetail/AlbumDetailContent";

interface AlbumDetailViewProps {
}

export const AlbumDetailView: React.FC<AlbumDetailViewProps> = () => {

    const album = useLoaderData();

    console.log(album)

    return (
        <Layout>
            <AlbumDetailHeader/>
            <AlbumDetailContent/>
        </Layout>
    )
}