const INITIAL_STATE = {
  loading: false,
  data: null,
  isAuthenticaded: false
}

export default function(state = INITIAL_STATE, action) {
  const {type, payload} = action
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        data: payload,
        loading: false,
        isAuthenticaded: true
      }
    case 'CREATE_USER':
      return {
        ...state,
        loading: false,
        data: payload
      }
    default:
      return state
  }
}
