/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return (...args) => {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 判断值得类型是否是 Object
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isObject (obj) {
  return toString.call(obj) === '[object Object]'
}

/**
 * 判断值得类型是否是 String
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isString (obj) {
  return toString.call(obj) === '[object String]'
}

/**
 * 判断值得类型是否是 Number
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isNumber (obj) {
  return toString.call(obj) === '[object Number]'
}

/**
 * 判断值得类型是否是 Function
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isFunction (obj) {
  return toString.call(obj) === '[object Function]'
}

/**
 * 判断值得类型是否是 Array
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isArray (obj) {
  return toString.call(obj) === '[object Array]'
}
