const INITIAL_STATE = {
  loading: false,
  data: null
}

export default function(state = INITIAL_STATE, action) {
  const {type, payload} = action
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
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
