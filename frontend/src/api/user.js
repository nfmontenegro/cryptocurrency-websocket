import {API} from '../utils'

const registerUser = async data =>
  await API({
    url: '/users',
    method: 'POST',
    data
  })

const loginUser = async data =>
  await API({
    url: '/login',
    method: 'POST',
    data
  })

const getProfile = async () =>
  await API({
    url: '/user/profile',
    method: 'GET'
  })

export {registerUser, loginUser}
