export default function(state, action) {
  const {type} = action
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}
