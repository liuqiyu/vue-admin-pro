import Vue from 'vue';
import { version } from 'element-ui';
import countTo from 'vue-count-to';
import directives from '../directives';
// import http from './../utils/http'
// 全局组件
<<<<<<< HEAD
import YusQueryTable from './yus-query-table'
import YusToolBar from './yus-tool-bar'
import YusQueyForm from './yus-query-form'
import YusTableList from './yus-query-table/yus-table-list'
import YusDialog from './yus-dialog'
import YusDetailsPage from './yus-details-page'
import YusContentPage from './yus-content-page'
import YusContentRow from './yus-content-row'
import YusContentCell from './yus-content-cell'
import YusActionBar from './yus-action-bar'
import YusThemePicker from './yus-theme-picker'
import YusButton from './yus-button'

const components = [YusQueryTable, YusToolBar, YusQueyForm,
  YusTableList, YusDialog, YusDetailsPage,
  YusContentPage, YusContentRow, YusContentCell,
  YusActionBar, YusThemePicker, YusButton
]
=======
import YusQueryTable from './yus-query-table';
import YusToolBar from './yus-tool-bar';
import YusQueyForm from './yus-query-form';
import YusTableList from './yus-query-table/yus-table-list';
import YusDialog from './yus-dialog';
import YusDetailsPage from './yus-details-page';

const components = [
  YusQueryTable,
  YusToolBar,
  YusQueyForm,
  YusTableList,
  YusDialog,
  YusDetailsPage
];
>>>>>>> feat: add from create

const setPrototype = () => {
  Vue.prototype.$bus = new Vue();
};

const setDirective = Vue => {
  Object.keys(directives).forEach(v => Vue.directive(v, directives[v]));
};

const install = Vue => {
  window.$version = {
    vue: Vue.version,
    ele: version
  };
  components
    .filter(v => typeof v !== 'function')
    .forEach(v => Vue.component(v.name, v));
  Vue.component('countTo', countTo);
  setPrototype(Vue);
  setDirective(Vue);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install;
