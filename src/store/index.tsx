import { configureStore } from "@reduxjs/toolkit";
import type { Reducer, AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// 实现数据持久化的配置操作
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import type { PersistPartial } from 'redux-persist/es/persistReducer'
  import storage from "redux-persist/lib/storage";

import usersReducer from './modules/users'
import type { UsersState } from './modules/users'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['token']
  }


const store = configureStore({
    reducer: {
      users: persistReducer(persistConfig, usersReducer) as Reducer<UsersState & PersistPartial, AnyAction>,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // 序列化
    serializableCheck: false
    }),
})
// 持久化
persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch:() => AppDispatch = useDispatch

export default store;