import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './css/tailwind.css'
import App from './App'
import {AuthProvider} from './context/store/auth-context'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)
