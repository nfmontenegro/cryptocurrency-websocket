import {requestAPI} from '../../api'
import {CREATE_USER, LOGIN_SUCCESS, ERROR, GET_USER_PROFILE, LOADING} from '../constants'

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

const loadingRequest = dispatchType => {
  return {
    type: dispatchType
  }
}

const registerUserAction = formValues => async dispatch => {
  try {
    const response = await requestAPI('users', 'POST', formValues)
    return dispatch(successRequest(response.data, CREATE_USER))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

const loginUserAction = formValues => async dispatch => {
  try {
    const response = await requestAPI('login', 'POST', formValues)
    localStorage.setItem('token', response.data.token)
    return dispatch(successRequest(response.data, LOGIN_SUCCESS))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

const getUserProfile = () => async dispatch => {
  try {
    dispatch(loadingRequest(LOADING))
    const response = await requestAPI('profile', 'GET')
    return dispatch(successRequest(response.data, GET_USER_PROFILE))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

export {registerUserAction, loginUserAction, getUserProfile}
