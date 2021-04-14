import pattern from './pattern'

/**
 * 电话号码
 * @param {object} rule
 * @param {string} value
 * @param {function} callback
 */
export const tel = (rule, value, callback) => {
  if (value) {
    if (pattern.tel.test(value)) {
      callback()
    } else {
      return callback(new Error('输入的电话号码不合法'))
    }
  } else {
    return callback(new Error('请输入电话号码'))
  }
}

/**
 * 手机号码
 * @param {object} rule
 * @param {string} value
 * @param {function} callback
 */
export const phone = (rule, value, callback) => {
  if (value) {
    if (pattern.phone.test(value)) {
      callback()
    } else {
      return callback(new Error('手机号码格式不正确'))
    }
  } else {
    return callback(new Error('手机号码不能为空'))
  }
}
