import {CREATE_USER, LOGIN_SUCCESS, ERROR, LOADING} from '../constants'

const INITIAL_STATE = {
  data: null,
  error: false,
  loading: false,
  isAuthenticaded: false
}

export default function(state = INITIAL_STATE, action) {
  const {type, payload} = action
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: false,
        isAuthenticaded: true
      }
    case ERROR:
      return {
        ...state,
        data: payload,
        error: true,
        loading: false,
        isAuthenticaded: false
      }
    case CREATE_USER:
      return {
        ...state,
        loading: false,
        data: payload,
        error: false
      }
    default:
      return state
  }
}
