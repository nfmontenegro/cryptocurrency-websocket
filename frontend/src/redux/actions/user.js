import {requestAPI} from '../../api'
import {ERROR, LOADING, REQUEST_METHOD} from '../constants'

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
    const response = await requestAPI('users', REQUEST_METHOD['POST'], formValues)
    return dispatch(successRequest(response.data))
  } catch (err) {
    const errorMessage = err.response.data.message
    return dispatch(failureRequest(errorMessage))
  }
}

const loginUserAction = formValues => async dispatch => {
  try {
    const response = await requestAPI('login', REQUEST_METHOD['POST'], formValues)
    localStorage.setItem('token', response.data.token)
    return dispatch(successRequest(response.data))
  } catch (err) {
    const errorMessage = err.response.data.message
    return dispatch(failureRequest(errorMessage))
  }
}

const getUserProfile = () => async dispatch => {
  try {
    dispatch(loadingRequest())
    const response = await requestAPI('profile', REQUEST_METHOD['GET'])
    return dispatch(successRequest(response.data))
  } catch (err) {
    const errorMessage = err.response.data.message
    return dispatch(failureRequest(errorMessage))
  }
}

export {registerUserAction, loginUserAction, getUserProfile}
