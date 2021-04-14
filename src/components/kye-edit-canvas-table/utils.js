// import { cellPaddingWidth, fontSize } from './config'
const cellPaddingWidth = 6
const fontSize = 12
// 校验中文正则
const chinessReg = /[\u4e00-\u9fa5|%]/

const chinessMark = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|@|$]/

const BigReg = /[A-Z]/

// 判断一个参数是否是未定义的，如果是undefined返回false，否则返回true
export const isDef = v => v !== undefined

// 获取数据
export const getValue = (column, val) => {
  if (!val) {
    return ''
  }
  let value = val
  if (column.filter && value) {
    if (column.filter.type && column.filter.args) {
      let func = this.$filter[column.filter.type]
      if (func) {
        value = func(value, ...column.filter.args)
      }
    } else {
      let func = this.$filter[column.filter]
      if (func) {
        value = func(value)
      }
    }
  }
  let type = Object.prototype.toString.call(value)
  if (type.indexOf('Null') > -1 || type.indexOf('Undefined') > -1) {
    value = ''
  }
  return value + ''
}

// 溢出隐藏计算
export const textOverflow = (ctx, text, width) => {
  let str = ''
  let len = 2 * cellPaddingWidth
  const sl = 6.7
  const wl = 12
  const ml = 8
  const threePoint = 18
  let over = false

  // 字段值存在 或者为 0
  text = text || (typeof text === 'number') ? text + '' : ''
  const tw = Math.floor(ctx.measureText(text).width) || 1
  if (text && text.length > 2 && tw > (width - len)) {
    // TODO: 写个方法优化，需要从一般开始
    let arr = text.split('')
    for (let i = 0, le = arr.length; i < le; i++) {
      let char = arr[i]
      if (chinessReg.test(char) || chinessMark.test(char)) {
        len += wl
      } else if (BigReg.test(char)) {
        len += ml
      } else {
        len += sl
      }
      if (len > (width - threePoint)) {
        str = `${str}...`
        over = true
        break
      } else {
        str = `${str}${char}`
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
