import React from 'react'
import {useLocation} from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Welcome = () => {
  const query = useQuery()
  const email = query.get('user')

  return (
    <div className="text-center mt-6">
      <p className="text-2xl font-medium">Verification link sent!</p>
      <p>We emailed a confirmation link to ${email} Check your email for a link to sign in APP </p>
      <a href="/login">Login</a>
    </div>
  )
}

export default Welcome
