import Vue from 'vue'
// import http from './../utils/http'
// 全局组件
import QueryTable from './query-table/index'
// import SearchPager from './query-table/search-pager'
// import QueyForm from './query-table/query-form'
import TableList from './query-table/table-list'

const components = [
  QueryTable,
  // SearchPager,
  // QueyForm,
  TableList
]

const setPrototype = () => {
  Vue.prototype.$bus = new Vue()
  // Vue.prototype.$http = http
  // Vue.component('full-calendar', fullCalendar)
}

const install = () => {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
  setPrototype(Vue)
}

export default install
