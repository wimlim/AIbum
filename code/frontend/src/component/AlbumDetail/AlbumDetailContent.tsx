
import React from 'react';
import { Layout } from 'antd';

interface AlbumDetailContentProps {
}

const AlbumDetailContentStyle:React.CSSProperties = {
    backgroundColor:"white",
}

export const AlbumDetailContent: React.FC<AlbumDetailContentProps> = () => {
    return (
        <Layout.Content style={AlbumDetailContentStyle}>
            this is content
        </Layout.Content>
    )
}