export default function(state, action) {
  const {type} = action
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true
      }
    default:
      return state
  }
}
