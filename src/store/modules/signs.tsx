/*
 * @Author: 刘凌晨 liulingchen1109@163.com
 * @Date: 2023-04-29 16:37:28
 * @LastEditTime: 2023-04-30 19:15:45
 * @FilePath: \React-ts-app\src\store\modules\signs.tsx
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import http from "../../utils/http";

type Token = string
export type Infos = {
    [index: string]: unknown
}

export type SignsState = {
    token: Token
    infos: Infos
}

type Time = {
    userid: string
}


// 异步方法
// 获取打卡信息
export const getTimeAction = createAsyncThunk('signs/getTimeAction', async (payload: Time) => {
    const ret = await http.get('/signs/time', payload)
    return ret
})

// 更细打卡信息
export const putTimeAction = createAsyncThunk('signs/putTimeAction', async (payload: Time) => {
    const ret = await http.put('/signs/time',payload)
    return ret
})

const signsSlice = createSlice({
    name:'signs',
    initialState: {
        infos: {}
    } as SignsState,
    reducers: {
        // 同步方法
        updateInfos(state, action: PayloadAction<Infos>) {
            state.infos = action.payload;
        }
    }
})

export const {updateInfos} = signsSlice.actions

export default signsSlice.reducer;