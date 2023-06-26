import { useLoaderData } from "react-router-dom";
import { FolderProps } from "../test/test_photo";

interface AlbumDetailProps {
}

export const AlbumDetail: React.FC<AlbumDetailProps> = () => {
    const album = useLoaderData();
    console.log(album)
    return(
        <div>

        </div>
    )
}