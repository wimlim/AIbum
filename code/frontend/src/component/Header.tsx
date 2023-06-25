import { Image } from "antd"
import logo from "../assets/img/AIbum.png"
interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <div>
            <Image src={logo} preview={false} height='64px'/>
        </div>
    )
}