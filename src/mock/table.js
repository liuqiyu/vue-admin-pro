import Mock from 'mockjs'
import { host } from './../config'

Mock.mock(host + '/getTable', 'post', data => {
  const list = [
    {
      name: '刘依冉123',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉123',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉123',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    }
  ]
  // return success(list)
  return {
    data: {
      data: list,
      total: 100
    },
    message: '操作成功',
    code: 200
  }
})

Mock.mock(host + '/getTableDetails', 'post', () => {
  const data = {
    name: '刘依冉',
    age: '12天',
    gender: 2,
    nickname: '依依',
    address: '南山'
  }

  return {
    data: {
      data: data
    },
    message: '操作成功',
    code: 200
  }
})

Mock.mock(host + '/getCustomHeaderTable', 'post', () => {
  const header = [
    {
      label: '姓名',
      key: 'name',
      width: '180px'
    },
    {
      label: '昵称',
      key: 'nickname',
      width: '180'
    },
    {
      label: '年龄',
      key: 'age',
      width: '180'
    },
    {
      label: '性别',
      key: 'gender',
      width: '180'
    },
    {
      label: '地址',
      key: 'address'
    }
  ]
  const list = [
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    },
    {
      name: '刘依冉',
      age: '12天',
      gender: 2,
      nickname: '依依',
      address: '南山'
    }
  ]
  return {
    data: {
      header,
      data: list
    },
    message: '操作成功',
    code: 200
  }
})

/**
 * 表格详情修改
 */
Mock.mock(host + '/editTable', 'post', obj => {
  return {
    data: {
      data: obj
    },
    message: '操作成功',
    code: 200
  }
})
