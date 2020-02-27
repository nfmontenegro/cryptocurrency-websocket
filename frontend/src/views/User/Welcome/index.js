import React from 'react'
import {useLocation} from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Welcome = () => {
  const query = useQuery()
  const id = query.get('id')
  const email = query.get('user')

  return `Welcome ${email}`
}

export default Welcome
