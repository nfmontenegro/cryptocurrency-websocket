import {CREATE_USER, LOGIN_SUCCESS, LOGIN_FAILURE} from '../constants'
import {registerUser, loginUser} from '../../api'

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

const failureLogin = errorMessage => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMessage
  }
}

const successLogin = data => {
  localStorage.setItem('token', data)
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

const loginUserAction = formValues => async dispatch => {
  try {
    const response = await loginUser(formValues)
    return dispatch(successLogin(response.data))
  } catch (err) {
    return dispatch(failureLogin(err.response.data.message))
  }
}

export {registerUserAction, loginUserAction}
