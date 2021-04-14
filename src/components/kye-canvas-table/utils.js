import { cellPaddingWidth, fontSize } from './config'

// 校验中文正则
const chinessReg = /[\u4e00-\u9fa5|%]/

const chinessMark = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|@|$]/

const BigReg = /[A-Z]/

// 判断一个参数是否是未定义的，如果是undefined返回false，否则返回true
export const isDef = v => v !== undefined

// 获取数据
export const getValue = (key, obj) => {
  if (!key) {
    return ''
  }
  // 'a.b[0].c' or 'a.b[0].c[0]'
  if (key.indexOf('.') > 0) {
    let arr = key.split('.')
    let length = arr.length - 1
    return arr.reduce((s, k, i) => {
      let index = k.indexOf('[')
      if (i === length) {
        if (index > 0) {
          return (s[k.substr(0, index)] || [])[+k.substring(index + 1, k.length - 1)]
        }
        return s[k]
      } else {
        if (index > 0) {
          return (s[k.substr(0, index)] || [])[+k.substring(index + 1, k.length - 1)] || {}
        }
        return s[k] || {}
      }
    }, obj)
  }
  // 'a[0]'
  let index = key.indexOf('[')
  if (index > 0) {
    return (obj[key.substr(0, index)] || [])[+key.substring(index + 1, key.length - 1)]
  }
  return obj[key]
}

// 从一半开始往回或者往后计算
// const toHalf = (ctx, text, width, ratio) => {
//   const half = Math.floor(text.length / 2)
//   let str1 = text.substr(0, half)
//   let str2 = text.substr(half)
//   const s1 = Math.floor(ctx.measureText(str1).width) || 1
//   let arr = []
//   if (s1 < width) {
//     arr = 123
//   } else {
//   }
// }

// 溢出隐藏计算
export const textOverflow = (ctx, text, width, ratio) => {
  let str = ''
  let len = 2 * cellPaddingWidth * ratio
  const sl = 6.7 * ratio
  const wl = 12 * ratio
  const ml = 8 * ratio
  const threePoint = 18 * ratio
  let over = false

  // 字段值存在 或者为 0
  text = text || (typeof text === 'number') ? text + '' : ''
  const tw = Math.floor(ctx.measureText(text).width) || 1
  if (text && text.length > 2 && tw > (width - len)) {
    // TODO: 写个方法优化，需要从一般开始
    let arr = text.split('')
    for (let i = 0, le = arr.length; i < le; i++) {
      if (chinessReg.test(arr[i]) || chinessMark.test(arr[i])) {
        len += wl
      } else if (BigReg.test(arr[i])) {
        len += ml
      } else {
        len += sl
      }
      if (len > (width - threePoint)) {
        str += '...'
        over = true
        break
      } else {
        str += arr[i]
      }
    }
  } else {
    str = text
  }
  return {
    over,
    text: str
  }
}

// 头部排序位置计算
export const sortPosition = (ctx, text) => {
  if (text || typeof text === 'number') {
    text = text + ''
    return Math.floor(ctx.measureText(text).width) || text.length * fontSize
  }
  return 0
}

// 生成uuid
const ustr = () => Math.random().toString(36).substr(3)
export const createUuid = () => ustr() + ustr()

// 加载图片
export const loadImage = async url => {
  const Image = new window.Image()
  Image.src = url
  return new Promise((resolve, reject) => {
    Image.onload = () => {
      resolve(Image)
    }
    Image.onerror = err => {
      reject(err)
    }
  })
}

const strReg = /^￥/
// 转成数字
export const toNumber = num => {
  // 如果是人民币的形式, 先去掉￥ 然后在转数字
  if (strReg.test(num)) {
    num = num.substr(1).replace(',', '')
  }
  return isNaN(+num) ? 0 : +num
}
