import { Button, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { loginAction, updateToken } from "../../store/modules/users";
import styles from './Login.module.scss';

export default function Login() {
    const token = useSelector((state: RootState) => state.users.token)
    const dispatch = useAppDispatch()
    const handleLogin = () => {
        dispatch(loginAction({email: 'huangrong@imooc.com', pass: 'huangrong'})).then
        ((action) => {
            // console.log(action);
            // 将需要的数据解构出来
            const { errcode, token} = (action.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
            if( errcode === 0 && typeof token === 'string') {
                dispatch(updateToken(token))
                message.success('登录成功')
            } else {
                message.error('登录失败')
            }
        })
    }
    return (
        <div>
            Login
            <Button onClick={handleLogin}>登录</Button>
            {token}
        </div>
    )
}