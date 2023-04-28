import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '../store';
import { clearToken } from '../store/modules/users';
import { message } from 'antd';

// 分装axios
const instance = axios.create({
    baseURL: 'http://api.h5ke.top/',
    timeout: 5000
})

instance.interceptors.request.use(function (config) {
    // 设置请求头
    if(config.headers) {
        config.headers.Authorization = store.getState().users.token;
    }
    return config;
}, function (error) {
    return Promise.reject(error)
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if(response.data.errmsg === 'token error') {
        message.error('token error')
        store.dispatch(clearToken())
        // 刷新页面
        setTimeout(() => {
            window.location.replace('/login')
        },1000)
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

interface Data {
    [index: string]: unknown
}

interface Http {
    get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>

}

const http: Http = {
    get(url, data, config) {
        return instance.get(url, {
            params: data,
            ...config
        })
    },
    post(url, data, config) {
        return instance.post(url, data, config)
    },
    put(url, data, config) {
        return instance.put(url, data, config)
    },
    patch(url, data, config) {
        return instance.patch(url, data, config)
    },
    delete(url, data, config) {
        return instance.delete(url, {
            data, 
            ...config
        })
    }
}

export default http