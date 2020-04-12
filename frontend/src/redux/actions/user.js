import {requestAPI} from '../../api'
import {ERROR, LOADING} from '../constants'

const failureRequest = errorMessage => ({
  type: ERROR,
  payload: errorMessage
})

const successRequest = data => ({
  type: REQUEST_SUCCESS,
  payload: data
})

const loadingRequest = () => ({
  type: LOADING
})

const registerUserAction = formValues => async dispatch => {
  try {
    const response = await requestAPI('users', 'POST', formValues)
    return dispatch(successRequest(response.data))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

const loginUserAction = formValues => async dispatch => {
  try {
    const response = await requestAPI('login', 'POST', formValues)
    localStorage.setItem('token', response.data.token)
    return dispatch(successRequest(response.data))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

const getUserProfile = () => async dispatch => {
  try {
    dispatch(loadingRequest())
    const response = await requestAPI('profile', 'GET')
    return dispatch(successRequest(response.data))
  } catch (err) {
    return dispatch(failureRequest(err.response.data.message))
  }
}

export {registerUserAction, loginUserAction, getUserProfile}
