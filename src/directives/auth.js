/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-14 17:14:57
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-16 11:27:34
 */
import store from '@/store'

export default {
  inserted (el, binding) {
    if (binding.value) {
      // 删除 removeChild 存在渲染问题，暂时使用隐藏功能
      // 解决方案：修改bind为inserted （https://blog.csdn.net/lijiabinbbg/article/details/96008809）
      if (!store.getters.roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
