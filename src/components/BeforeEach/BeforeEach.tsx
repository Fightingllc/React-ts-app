import React from "react";
import {useLocation, matchRoutes, Navigate} from 'react-router-dom'
import {routes} from '../../router'
import { infosAction, updateInfos } from "../../store/modules/users";

import type { Infos } from "../../store/modules/users";
import { useAppDispatch} from '../../store'
import { useSelector } from "react-redux";
import type {RootState} from '../../store';
import _ from 'lodash';


interface BeforeEachProps {
    children?:React.ReactNode
}


export default function BeforeEach(props: BeforeEachProps) {

    const token = useSelector((state: RootState) => state.users.token)
    const infos = useSelector((state: RootState) => state.users.infos)

    // console.log("infos",infos);
    
    const dispatch = useAppDispatch()
    // 对路由做导航守卫
     const location = useLocation();
     const matchs = matchRoutes(routes, location)

    //  console.log('location',location);
    //  console.log('matchs', matchs);
     
    //  由于matchs中的最后一项类型不确定 所以加个类型保护(isArray)
    if( Array.isArray(matchs)) {
        const meta = matchs[matchs.length - 1].route.meta

        if(meta?.auth && _.isEmpty(infos)) {   
            if(token) {
                dispatch(infosAction()).then((action) => {
                const {errcode, infos} = (action.payload as {[index:string]:unknown}).data as {[index:string]:unknown}     
                
                if(errcode === 0) {
                    dispatch(updateInfos(infos as Infos))
                    console.log('infosssss',infos);
                    
                }
                })
             } 
            else {
             return <Navigate to="/login" />
            }
        }
    }
    // 登录成功后go home
    if(token && location.pathname === '/login'){
        return <Navigate to='/' />
    }
    return (
        <>
          {props.children}  
        </>
    )
}