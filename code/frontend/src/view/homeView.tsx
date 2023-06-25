
/**
 * @file homeView.tsx
 * @desc 主页面
 * @brief using ant design layout example, my componnet is Header, SideBar,and others in Outlet
 * @ref https://ant.design/components/layout-cn/
 * 
 */

import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../component/Header'
import { Layout, theme } from 'antd';
import { SideBar } from '../component/SideBar';

const { Content, Sider } = Layout;

interface HomeViewProps {
}



export const HomeView: React.FC<HomeViewProps> = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <SideBar/>             
          </Sider>
          <Layout>
            <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
                <Header />
            </Layout.Header>
            <Content style={{ margin: '0 16px',marginTop:'16px'}}>
              <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                <Outlet/>
              </div>
            </Content>
          </Layout>
        </Layout>
      );
}