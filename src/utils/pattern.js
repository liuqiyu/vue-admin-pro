/* eslint-disable */
export default {
  // 座机号
  tel: /^(\d{3,4}-\d{3,8})+(-\d{1,4})?$/,

  // 手机号
  phone: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,

  // 手机或者座机
  telPhone: /(^1[3|4|5|6|7|8|9][0-9]\d{8}$)|(^(\d{3,4}-\d{3,8})+(-\d{1,4})?$)/,

  // 4-5位 2位小数 用于百分比值 范围 0.01- 99.99
  per: /^(([1-9])?([0-9]).([0-9]){2})$/,

  // 员工姓名 人员选择器中使用
  username: /^[\u4e00-\u9fa5]{1,5}/,

  // 2位小数 或整数的正则
  decNum: /^[0-9]+\.{0,1}[0-9]{0,2}$/,

  // 整数正则
  intNum: /^[1-9]\d*$/,

  // 仓储天数
  numDay: /^\d{1,3}$/,

  // 外计提日 (01～09和1～31)
  payDay: /^((0?[1-9])|((1|2)[0-9])|30|31)$/,

  // 身份证号码
  IDCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,

  // 非中文
  nonChinese: /[\u4e00-\u9fa5]+/,

  // email
  emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
}
