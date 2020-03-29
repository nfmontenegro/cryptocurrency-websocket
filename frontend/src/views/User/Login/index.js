import React, {useState} from 'react'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'

import {loginUserAction} from '../../../redux/actions'
import {Button, Input, Notification} from '../../../components'
import {useEffect} from 'react'

const INITIAL_VALUES = {
  email: '',
  password: ''
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})

const Login = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const [notification, setNotification] = useState({show: false, message: null})
  const history = useHistory()

  console.log(userState.data)
  useEffect(() => {
    if (userState.isAuthenticaded) {
      history.push('/home')
    } else {
      setSubmitting(false)
      setNotification({show: true, message: userState.message})
      //fake async
      setTimeout(() => setNotification(false), 2500)
    }
  }, [userState.isAuthenticaded])

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SignupSchema,
    onSubmit: async values => await dispatch(loginUserAction(values))
  })

  const {handleSubmit, handleChange, values, isSubmitting, setSubmitting} = formik

  return (
    <React.Fragment>
      {notification.show && <Notification message={notification.message} />}
      <div className="grid grid-cols-8">
        <div className="col-start-4 col-span-6">
          <form className=" max-w-sm" onSubmit={handleSubmit}>
            <Input type="email" label="Email" name="email" onChange={handleChange} value={values.email} />
            <Input type="password" label="Password" name="password" onChange={handleChange} value={values.password} />
            <Button value="Sign in" isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
