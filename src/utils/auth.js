const sessionKey = 'sessionID'

export const setSession = sessionId => {
  sessionStorage.setItem(sessionKey, sessionId)
}

export const getSession = () => {
  return sessionStorage.getItem(sessionKey)
}

export const removeSession = () => {
  sessionStorage.removeItem(sessionKey)
}
