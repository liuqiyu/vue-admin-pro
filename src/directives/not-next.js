export default {
  bind (el) {
    let inputs = el.getElementsByTagName('input')
    Array.from(inputs).forEach(item => {
      item.setAttribute('data-next', 'not-next')
    })
  }
}
