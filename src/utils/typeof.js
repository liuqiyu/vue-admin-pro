/*
 * @Description: typeof 检测数据类型
 * @Author: liuqiyu
 * @Date: 2019-11-07 14:21:56
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-07 14:41:51
 */

// 是否数组
export const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// 是否对象
export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

// 是否函数
export const isFunction = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

// 是否数值
export const isNumber = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

// 是否字符串
export const isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]'
}

// 是否Boolean
export const isBoolean = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Boolean]'
}

// 是否Null
export const isNull = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Null]'
}

// 是否Undefined
export const isUndefined = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Undefined]'
}

// 是否Symbol
export const isSymbol = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Symbol]'
}
