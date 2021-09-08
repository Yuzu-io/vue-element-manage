import { request } from './request';


// 封装页面请求
export function getSignIn () {
  return request({
    url: '/json/admin.json',
  })
}

export function getAdmin(){
  return request({
    url: '/json/admin.json',
  })
}

export function getUser(){
  return request({
    url: '/json/user.json',
  })
}

// export function getSignIn (user_name, password) {
//   return request({
//     url: '/admin/login',
//     method: 'post',
//     // data: signin
//     params: {
//       user_name,
//       password
//     }
//   })
// }

// export function getAdmin () {
//   return request({
//     url: '/admin/info'
//   })
// }