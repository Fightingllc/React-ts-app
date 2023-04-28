import React from "react";
import styles from './Home.module.scss';
// 配置二级路由

import { Layout } from 'antd';
import HomeHeader from "./components/HomeHeader";
import HomeAside from "./components/HomeAside";
import HomeBreadcrumb from "./components/HomeBreadcrumb";
import HomeMain from "./components/HomeMain";

const { Header, Content, Sider } = Layout;

export default function Home() {
    return (
    <Layout>
      <Header className="header">
        <HomeHeader/>
      </Header>
      <Layout>
        <Sider width={300} theme="light">
            <HomeAside/>
        </Sider>
        <Layout style={{ padding: '24px' }}>
            <HomeBreadcrumb/>
            <Content className={styles['home-main']}>
                 <HomeMain />
             </Content>
        </Layout>
      </Layout>
    </Layout>
    )
}