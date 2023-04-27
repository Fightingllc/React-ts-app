import React from "react";
import {useLocation, matchRoutes, Navigate} from 'react-router-dom'
import {routes} from '../../router'


interface BeforeEachProps {
    children?:React.ReactNode
}


export default function BeforeEach(props: BeforeEachProps) {
    // 对路由做导航守卫

     const location = useLocation();
     const matchs = matchRoutes(routes, location)

     console.log('location',location);
     console.log('matchs', matchs);
     
    //  由于matchs中的最后一项类型不确定 所以加个类型保护(isArray)
    if( Array.isArray(matchs)) {
        const meta = matchs[matchs.length - 1].route.meta

        // if(meta?.auth) {
        //    return <Navigate to="/login" />
        // }
    }

    return (
        <>
          {props.children}  
        </>
    )
}