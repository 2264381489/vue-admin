import axios from 'axios'
import router from '@/router/index'
import { localGet } from './index'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
// todo 后端访问接口
// axios.defaults.baseURL = 'http://localhost:2021/api'
// todo 无后端测试
axios.defaults.baseURL = '/dev-api'
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    return Promise.reject(res)
  }
  if (res.status !== 200) {
    if (res.data.message) console.error(res.data.message)
    if (res.status === 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  } else {
    console.log('成功')
  }

  return res.data.data
})

export default axios
