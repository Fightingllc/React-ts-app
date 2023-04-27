import React from "react";
import styles from './Home.module.scss';
// 配置二级路由
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div>
            Home
            <Outlet/>
        </div>
    )
}