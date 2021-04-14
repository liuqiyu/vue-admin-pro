import Mock from 'mockjs'
import {
  host
} from './../config'

Mock.mock(host + '/getGender', 'get', () => {
  const data = [
    {
      id: '0',
      label: '未知'
    },
    {
      id: '1',
      label: '男'
    },
    {
      id: '2',
      label: '女'
    }
  ]
  return {
    data,
    code: 200
  }
})

Mock.mock(host + '/getFamily', 'get', () => {
  const data = [
    {
      id: '0',
      label: '爸爸'
    },
    {
      id: '1',
      label: '妈妈'
    },
    {
      id: '2',
      label: '女儿'
    }
  ]
  return {
    data,
    code: 200
  }
})

