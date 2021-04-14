/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-14 17:14:57
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-26 17:29:57
 */
import Vue from 'vue'
import { version } from 'element-ui'
import countTo from 'vue-count-to'
import directives from '../directives'
import * as filters from '@/utils/filter'
// 全局组件
import SmartQueryTable from './smart-query-table'
import SmartButtonList from './smart-tool-list'
import SmartQueyForm from './smart-query-form'
import SmartDialog from './smart-dialog'
import SmartDetailsPage from './smart-details-page'
import SmartContentPage from './smart-content-page'
import SmartThemePicker from './smart-theme-picker'
import SmartBody from './smart-body'

const components = [SmartQueryTable, SmartButtonList, SmartQueyForm, SmartDialog, SmartDetailsPage,
  SmartContentPage, SmartThemePicker, SmartBody
]

export const PAGINATION = {
  layout: 'sizes, total, prev, pager, next',
  layout2: 'sizes, total, prev, pager, next',
  pageSizes: [200],
  pageSize: 200
}


// 自定义原型
const setPrototype = () => {
  Vue.prototype.$bus = new Vue()
}

// 自定义指令
const setDirective = Vue => {
  Object.keys(directives).forEach(v => Vue.directive(v, directives[v]))
}

// 自定义过滤器
const setFilters = Vue => {
  Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
}

const install = (Vue) => {
  window.$version = {
    vue: Vue.version,
    ele: version
  }

  Vue.prototype.$pagination = PAGINATION

  components.filter(v => typeof v !== 'function').forEach(v => Vue.component(v.name, v))
  Vue.component('countTo', countTo)
  setPrototype(Vue)
  setDirective(Vue)
  setFilters(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
