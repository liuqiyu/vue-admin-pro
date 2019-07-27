import Mock from 'mockjs'
import { host } from './../config'
import { success } from './send'

Mock.mock(host + '/getTable', 'post', () => {
  const list = [
    {
      label: '名称',
      key: 'name',
      value: '刘依冉'
    }
  ]
  return success(list)
})

Mock.mock(host + '/login', 'post', () => {
  const data = {
    sessionID: 1234567890,
    data: {
      username: '刘依冉',
      password: 123456
    }
  }
  return success(data, '登陆成功！')
})

Mock.mock(host + '/logout', 'post', () => {
  return success({}, '注销成功')
})
