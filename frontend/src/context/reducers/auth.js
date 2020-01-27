export default function(state, action) {
  const {type} = action
  switch (type) {
    case 'EXAMPLE':
      return {
        ...state,
        isAuthenticated: true
      }
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}
