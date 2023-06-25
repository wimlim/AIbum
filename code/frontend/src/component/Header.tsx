
import { Input } from 'antd';

const { Search } = Input;

interface HeaderProps {
}

const HeaderStyle:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <div style={HeaderStyle}>
            <Search
                placeholder="Search"
                size='large'
                allowClear
            />
        </div>
    )
}