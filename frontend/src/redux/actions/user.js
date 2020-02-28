import {registerUser} from '../../api'

const registerUserAction = formValues => {
  return dispatch => {
    return registerUser(formValues)
      .then(response =>
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: response
        })
      )
      .catch(err => err)
  }
}

export {registerUserAction}
