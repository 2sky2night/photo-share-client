import axios, { type AxiosRequestConfig } from 'axios'
import { nprogress } from '..'
import { useUserStore } from '@/store'
import type { Response } from './types'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

//  请求拦截器
http.interceptors.request.use(
  (config) => {
    const { userInfo: { token } } = useUserStore()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    nprogress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    nprogress.end()
    return response.data
  },
  (error) => {
    // 错误处理
    return Promise.reject(error)
  }
)

export const request = {
  get<T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<Response<T>> {
    return http.get(url, {
      ...config,
      params
    })
  },
  post<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<Response<T>> {
    return http.post(url, data, config)
  },
  delete<T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<Response<T>> {
    return http.delete(url, {
      ...config,
      params
    })
  },
  put<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<Response<T>> {
    return http.put(url, data, config)
  }
}