import {CREATE_USER} from '../constants'
import {registerUser} from '../../api'

const registerUserAction = formValues => {
  return dispatch => {
    return registerUser(formValues)
      .then(response =>
        dispatch({
          type: CREATE_USER,
          payload: response
        })
      )
      .catch(err => err)
  }
}

export {registerUserAction}
