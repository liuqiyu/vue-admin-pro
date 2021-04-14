const modelFactory = (s, v, key, defValFun) => {
  if (!key) {
    return s
  }
  if (key.indexOf('.') > 0) {
    let arr = key.split('.')
    let length = arr.length - 1
    arr.reduce((s2, k, i) => {
      if (!s2[k]) {
        if (i < length) {
          let o = {}
          s2[k] = o
          return o
        }
        s2[k] = (defValFun && typeof defValFun === 'function')
          ? defValFun(v, key)
          : (v.hasOwnProperty('default') ? v.default : '')
        return s2
      }
      return s2[k]
    }, s)
  } else {
    s[key] = (defValFun && typeof defValFun === 'function')
      ? defValFun(v, key)
      : (v.hasOwnProperty('default') ? v.default : '')
  }
  return s
}

export const createModel = (fields, propertyKey, defValFun) => {
  return fields.reduce((s, v) => {
    if (Array.isArray(v.valueKey) && v.valueKey.length) {
      v.valueKey.forEach(key => {
        modelFactory(s, v, key, defValFun)
      })
    }
    if ((v.type === 'range' || v.type === 'rangeMenu') && v.options && v.options.length) {
      v.options.forEach(k => {
        modelFactory(s, v, k[propertyKey], defValFun)
      })
    }
    if (v.type === 'menu' && v.options && v.options.length) {
      v.options.forEach(k => {
        if (k.type === 'range' && k.options && k.options.length) {
          k.options.forEach(m => {
            modelFactory(s, v, m[propertyKey], defValFun)
          })
        } else {
          modelFactory(s, v, k[propertyKey], defValFun)
        }
      })
    }
    return modelFactory(s, v, v[propertyKey], defValFun)
  }, {})
}

export const getModelValue = (model, key) => {
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
    }, model)
  }
  // 'a[0]'
  let index = key.indexOf('[')
  if (index > 0) {
    return (model[key.substr(0, index)] || [])[+key.substring(index + 1, key.length - 1)]
  }
  return model[key]
}

export const setModelValue = (val, model, key) => {
  if (!key) {
    return
  }
  if (key.indexOf('.') > 0) {
    let arr = key.split('.')
    let length = arr.length - 1
    arr.reduce((s, k, i) => {
      if (i === length) {
        s[k] = val
      }
      return s[k]
    }, model)
  } else {
    model[key] = val
  }
}
