import http from '@/plugins/axios'
import { ILoginResponse } from './types/common'

// 获取验证码
export const getCaptcha = () => {
  return http.request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob' // 请求获取图片数据
  })
}
// 登录
export const login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => {
  return http.request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data
  })
}
// 退出登录
export const logout = () => {
  return http.request({
    method: 'GET',
    url: '/setting/admin/logout'
  })
}
