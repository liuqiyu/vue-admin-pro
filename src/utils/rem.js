let deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
  window.addEventListener(
    'resize',
    function () {
      setHtmlFontSize()
    },
    false
  )
}
function setHtmlFontSize () {
  // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
  deviceWidth =
    document.documentElement.clientWidth > 1920
      ? 1920
      : document.documentElement.clientWidth
  document.getElementsByTagName('html')[0].style.cssText =
    'font-size:' + deviceWidth / 19.2 + 'px !important'
}
