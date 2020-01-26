import React, { useContext } from 'react'
import { AuthContext } from './context/store/auth-context'

const Example = () => {
  const context = useContext(AuthContext)

  const handleLogin = () => {
    context.dispatch({
      type: 'EXAMPLE'
    })
  }

  const handleLogout = () => {
    context.dispatch({
      type: 'LOG_OUT'
    })
  }

  const { isAuthenticated } = context.auth
  return (
    <div>
      {isAuthenticated ? 'Yes' : 'Nope'}
      <button onClick={isAuthenticated ? handleLogout : handleLogin}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}

export default Example
