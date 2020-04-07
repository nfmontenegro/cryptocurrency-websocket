import {CREATE_USER, LOGIN_SUCCESS, ERROR, LOADING} from '../constants'

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: false,
  isAuthenticated: false
}

export default function (state = INITIAL_STATE, action) {
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
        isAuthenticated: true
      }
    case ERROR:
      return {
        ...state,
        data: payload,
        loading: false,
        error: true,
        isAuthenticated: false
      }
    case CREATE_USER:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload
      }
    case 'NOT_PERSIST': {
      return {
        data: null,
        loading: false,
        isAuthenticated: false
      }
    }
    default:
      return state
  }
}
