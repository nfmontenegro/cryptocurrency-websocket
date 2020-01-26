import React, { createContext, useReducer } from 'react'
import authReducer from '../reducers/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    isAuthenticated: false
  })
  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
