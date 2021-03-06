import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
const token = window.localStorage.getItem('token')
// console.log(token)
// console.log(window.localStorage)
// console.log(window.location.origin)
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0'
  }
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    config.headers['Blade-Auth'] = 'bearer ' + window.localStorage.getItem('token')
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    Toast.clear()
    const res = response.data
    if (res.code && res.code !== 200) {
      // 登录超时,重新登录
      if (res.code === 401) {
        console.log(401)
        localStorage.clear()
        window.location.href = window.location.origin
        // store.dispatch('FedLogOut').then(() => {
        //   location.reload()
        // })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    localStorage.clear()
    window.location.href = window.location.origin
    return Promise.reject(error)
  }
)

export default service
