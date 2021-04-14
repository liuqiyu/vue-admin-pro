export const getToken = () => {
  return sessionStorage.getItem('ERPTOKEN') || ''
}

export const setToken = token => {
  sessionStorage.setItem('ERPTOKEN', token || '')
}
