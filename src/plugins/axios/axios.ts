import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

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
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private responseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
