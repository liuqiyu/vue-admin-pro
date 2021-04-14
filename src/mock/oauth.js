import Mock from 'mockjs'
import { host } from './../config'

// 登录
Mock.mock(host + '/login', 'post', (form) => {
  let userInfo = JSON.parse(form.body)
  if (userInfo && ['admin', 'visitor'].includes(userInfo.username)) {
    const data = {
      token: (new Date()).valueOf(),
      userInfo: {
        username: userInfo.username,
        role: userInfo.username
      }
    }
    return {
      data,
      message: '登陆成功！',
      code: 200
    }
  } else {
    return {
      message: '用户名错误',
      code: 500
    }
  }
})

// 注销
Mock.mock(host + '/logout', 'post', () => {
  return {
    message: '注销成功',
    code: 200
  }
})

// 权限
Mock.mock(host + '/menuAuth', 'post', (form) => {
  let { role } = JSON.parse(form.body)
  let data = []
  if (role === 'admin') {
    data = [
      'table/deault'
    ]
  } else {
    data = []
  }
  return {
    data: data,
    code: 200
  }
})

