import Mock from 'mockjs'
import {
  host
} from './../config'

Mock.mock(host + '/login', 'post', () => {
  const data = {
    sessionID: 1234567890,
    data: {
      username: '刘依冉',
      password: 123456
    }
  }
  return {
    data: {
      data: data
    },
    message: '登陆成功！',
    code: 200
  }
})

Mock.mock(host + '/logout', 'post', () => {
  return {
    data: {
      data: {}
    },
    message: '注销成功',
    code: 200
  }
})
