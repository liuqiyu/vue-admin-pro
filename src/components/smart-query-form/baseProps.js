/**
 * 组件基础配置 props
 */
export default {
  // 时间选择器
  timePicker: {
    'is-range': false,
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss',
    'range-separator': '-',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间'
  },
  // 日期选择器
  datePicker: {
    type: 'date',
    format: 'yyyy-MM-dd HH:mm:ss',
    'value-format': 'yyyy-MM-dd HH:mm:ss',
    'range-separator': '-',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间'
  },
  select: {
    separator: ',',
    optionsValue: 'value',
    optionsLabel: 'label'
  }
}