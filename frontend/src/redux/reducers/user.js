import {REQUEST_SUCCESS, ERROR, LOADING} from '../constants'

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: false,
  isAuthenticated: false
}

//refact some requests reducers
export default function (state = INITIAL_STATE, action) {
  const {type, payload} = action
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case ERROR:
      return {
        ...state,
        data: payload,
        loading: false,
        error: true,
        isAuthenticated: false
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
        isAuthenticated: true
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
