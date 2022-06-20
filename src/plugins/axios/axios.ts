import { store } from '@/store'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'

interface ResponseResult<T> {
  status?: number
  message?: string
  data?: T
}
export default class Axios {
  private instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  public async request<T, D = ResponseResult<T>>(
    config: AxiosRequestConfig
  ): Promise<D> {
    return new Promise((resolve, reject) => {
      try {
        this.instance.request<D>(config).then((response) => {
          resolve(response.data)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  private interceptors() {
    this.requestInterceptor()
    this.responseInterceptor()
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        config.url = config.url?.trim()
        const { user } = store.state
        if (user && user.token) {
          ;(
            config.headers as AxiosRequestHeaders
          ).Authorization = `Bearer ${user.token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private responseInterceptor() {
    let isRefreshing = false
    this.instance.interceptors.response.use(
      (response) => {
        const { status } = response.data
        if (!status || status === 200) {
          return response
        }
        // 处理 Token 过期
        if (status === 410000) {
          if (isRefreshing) return Promise.reject(response)
          isRefreshing = true
          ElMessageBox.confirm(
            '您的登录已过期，您可以取消停留在此页面，或确认重新登录',
            '登录过期',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消'
            }
          )
            .then(() => {
              // 清除登录状态并跳转到登录页
              store.commit('setUser', null)
              router.push({
                name: 'login',
                query: {
                  redirect: router.currentRoute.value.fullPath
                }
              })
            })
            .finally(() => {
              isRefreshing = false
            })
          return Promise.reject(response)
        }

        // 其它错误给出提示即可，比如 400 参数错误之类的
        ElMessage({
          type: 'error',
          message: response.data.msg || '请求错误，请稍后重试',
          duration: 5 * 1000
        })
        return Promise.reject(response)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
