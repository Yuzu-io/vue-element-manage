import axios from 'axios';

export function request (config) {
  // 创建实例
  const instance = axios.create({
    // baseURL: 'http://192.168.200.103:8080',
    timeout: 5000
  })

  // axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })

  // 真正发送请求
  return instance(config)
}