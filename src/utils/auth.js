const sessionKey = 'sessionID'

export const setSession = sessionId => {
  localStorage.setItem(sessionKey, sessionId)
}

export const getSession = () => {
  return localStorage.getItem(sessionKey)
}

export const removeSession = () => {
  localStorage.removeItem(sessionKey)
}
