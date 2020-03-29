import {CREATE_USER, LOGIN_SUCCESS} from '../constants'
import {registerUser, loginUser} from '../../api'

const hasSomeError = serverResponse => {
  const statusCode = [400, 401]
  return statusCode.includes(serverResponse.status) ? true : false
}

const registerUserAction = formValues => {
  return dispatch => {
    return registerUser(formValues)
      .then(response =>
        dispatch({
          type: CREATE_USER,
          payload: response
        })
      )
      .catch(err => err)
  }
}

const failureLogin = error => {
  localStorage.removeItem('token')
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

const successLogin = data => {
  localStorage.setItem('token')
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

const loginUserAction = formValues => {
  return async dispatch => {
    const response = await loginUser(formValues)
    return hasSomeError(response) ? dispatch(failureLogin(response.data)) : dispatch(successLogin(response.data))
  }
}

export {registerUserAction, loginUserAction}
