import { useLoaderData } from "react-router-dom"

interface AlbumDetailViewProps {
}

export const AlbumDetailView: React.FC<AlbumDetailViewProps> = () => {

    const album = useLoaderData();

    console.log(album)

    return (
        <div>
            1
        </div>
    )
}