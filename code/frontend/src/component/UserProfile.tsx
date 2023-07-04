import React from 'react'
import { GlobalShareContext } from '../utils/GlobalShareReducer'

interface UserProfileProps {
}

const displayStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {

    const {state} = React.useContext(GlobalShareContext);

    const {photo} = state;

    return (
        <div style={displayStyle}>
            你现在有{photo.length}张图片
        </div>
    )
}