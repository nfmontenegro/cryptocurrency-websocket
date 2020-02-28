import {API} from '../../utils'

const registerUser = formValues => {
  const userRegistered = API({
    url: '/users',
    method: 'POST',
    data: formValues
  })
    .then(response => response.data)
    .catch(err => err.response)
}

export {registerUser}
