import store from '../store'
import { http } from './http'

const fetchCustomField = async (options) => {
  const menuId = store.state.menus[options.menu].id
  let userRes = {}
  if (options.catch && options.catch.length > 0) {
    userRes = options.catch
  } else {
    userRes = await http('system.genericSearch.listByMenuId', { menuId })
    options.catch = userRes
  }
  let field = userRes.find(v => v.searchCode === options.searchCode)
  return field.fieldContent ? JSON.parse(field.fieldContent) : []
}

const createPrams = (item) => {
  return {
    propertyName: item.propertyName,
    columnName: item.columnName || '',
    frontBrackets: item.frontBrackets || '(',
    postBrackets: item.postBrackets || ')',
    conditionOperation: item.conditionOperation || 'and',
    operation: item.operation || 'contain',
    type: item.type || 'string',
    values: item.value || []
  }
}

export const customQueryParams = async (options) => {
  let { formArr } = options
  let vos = []
  let fieldContent = null
  if (options.menu && options.searchCode) {
    fieldContent = await fetchCustomField(options)
  }
  if (formArr && formArr.length > 0) {
    for (let item of formArr) {
      let obj = {}
      if (options.menu && options.searchCode && fieldContent) {
        let res = fieldContent.find(v => v.propertyName === item.propertyName)
        obj = Object.assign({}, res, item)
      } else {
        obj = item
      }
      obj = createPrams(obj)
      vos.push(obj)
    }
    vos[vos.length - 1].conditionOperation = ''
  }
  return vos
}
