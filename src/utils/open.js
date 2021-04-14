window.__intercept__ = 1
window.erpOpen = (url, target = '', intercept = false) => {
  let a = document.createElement('a')
  a.href = url
  a.target = target
  a.style.display = 'none'
  if (!intercept) {
    window.__intercept__ = 0
  }
  a.click()
  window.__intercept__ = 1
}
