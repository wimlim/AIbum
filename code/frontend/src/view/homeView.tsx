
/**
 * @file homeView.tsx
 * @desc 主页面
 */

import React from 'react'
import { Header } from '../component/Header'
import { Outlet } from 'react-router-dom'

interface HomeViewProps {
}

const headerStyle:React.CSSProperties={
    width:"100%",
    height:"50px",
}

const contentStyle:React.CSSProperties={
    width:"100%",
    height:"100%",
//    backgroundColor:"blue"

}


export const HomeView:React.FC<HomeViewProps> = () => {
    return (
        <div>
            <div style={headerStyle}>
                <Header/>
            </div>
            <div style={contentStyle}>
                <Outlet/>
            </div>
        </div>
    )
}