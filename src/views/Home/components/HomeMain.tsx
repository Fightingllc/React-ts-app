import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import styles from '../Home.module.scss';
export default function HomeMain() {
  return (
    // <Outlet>应该在父路由元素中使用，以呈现它们的子路由元素。
    // 这允许在呈现子路由时显示嵌套UI。如果父路由完全匹配，它将呈现子索引路由，如果没有索引路由，则不呈现。
    <div >
      <Suspense>
        <Outlet/>
      </Suspense>
     
    </div>
  )
}
