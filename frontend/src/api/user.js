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

export {registerUser, loginUser}
