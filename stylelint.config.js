// https://ask.dcloud.net.cn/article/36067

module.exports = {
  ignoreFiles: ["**/*.js", "src/style/element-variables.scss", "theme/"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "no-empty-source": null,
    "color-hex-length": null, // 指定十六进制颜色的长度
    "font-family-no-missing-generic-family-keyword": null,
    "selector-pseudo-class-no-unknown": null, // 不允许未知的伪类选择器
    "selector-pseudo-element-no-unknown": null, // 不允许未知的伪元素选择器
    "no-duplicate-selectors": null, // 不允许重复的选择器
    "property-no-unknown": null, // 允许未知属性
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extend"]
      }
    ]
  }
}