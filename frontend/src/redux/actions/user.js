import {CREATE_USER, LOGIN_SUCCESS, ERROR} from '../constants'
import {registerUser, loginUser} from '../../api'

const failureRequest = errorMessage => ({
  type: ERROR,
  payload: errorMessage
})

const successRequest = (data, dispatchType) => {
  return {
    type: dispatchType,
    payload: data
  }
}

const registerUserAction = formValues => async dispatch => {
  try {
    const response = await registerUser(formValues)
    return dispatch(successRequest(response.data, CREATE_USER))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

const loginUserAction = formValues => async dispatch => {
  try {
    const response = await loginUser(formValues)
    localStorage.setItem('token', data)
    return dispatch(successRequest(response.data, LOGIN_SUCCESS))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

export {registerUserAction, loginUserAction}
