import {API} from '../utils'

const registerUser = data =>
  API({
    url: '/users',
    method: 'POST',
    data
  })
    .then(response => {
      //TODO: check if user exist

      return response.data
    })
    .catch(err => err.response)

export {registerUser}
