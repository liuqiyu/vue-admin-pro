import Vue from 'vue'
import directives from '../directives'
// import http from './../utils/http'
// 全局组件
import QueryTable from './query-table/index'
import ToolBar from './query-table/tool-bar'
import QueyForm from './query-table/query-form'
import TableList from './query-table/table-list'
import vDialog from './v-dialog'
import vDetailsPage from './v-details-page'

const components = [QueryTable, ToolBar, QueyForm, TableList, vDialog, vDetailsPage]

const setPrototype = () => {
  Vue.prototype.$bus = new Vue()
  // Vue.prototype.$http = http
  // Vue.component('full-calendar', fullCalendar)
}

const setDirective = Vue => {
  Object.keys(directives).forEach(v => Vue.directive(v, directives[v]))
}

const install = () => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  setPrototype(Vue)
  setDirective(Vue)
}

export default install
