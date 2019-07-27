/**
 * 请求成功
 * @param {*} data
 * @param {*} message
 */
export const success = (data, message) => {
  return {
    data,
    message: message || '操作成功',
    code: 200
  }
}

/**
 * 请求失败
 * @param {*} data
 * @param {*} message
 */
export const error = (data, message) => {
  return {
    data,
    message: message || '操作失败',
    code: 500
  }
}
