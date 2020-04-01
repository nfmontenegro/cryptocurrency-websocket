import {CREATE_USER, LOGIN_SUCCESS, ERROR, LOADING} from '../constants'

const INITIAL_STATE = {
  data: null,
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
        isAuthenticaded: true
      }
    case ERROR:
      return {
        ...state,
        data: payload,
        loading: false,
        isAuthenticaded: false
      }
    case CREATE_USER:
      return {
        ...state,
        loading: false,
        data: payload
      }
    default:
      return state
  }
}
