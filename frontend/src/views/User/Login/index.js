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
  password: '',
}

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

const Login = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const [notification, setNotification] = useState({show: false, message: null})
  const history = useHistory()

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SignupSchema,
    onSubmit: async values => await dispatch(loginUserAction(values)),
  })

  const {handleSubmit, handleChange, values, isSubmitting, setSubmitting} = formik

  useEffect(() => {
    const {isAuthenticated, data} = userState
    if (isAuthenticated) {
      history.push('/home')
    }

    if (data && !isAuthenticated) {
      setNotification({show: true, message: data})
      //fake async
      setTimeout(() => setNotification(false), 2500)
    }
  }, [userState, history, setSubmitting])

  return (
    <React.Fragment>
      {notification.show && <Notification message={notification.message} />}
      <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-1 text-center text-3xl leading-9 font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className=" max-w-sm mt-8" onSubmit={handleSubmit}>
            <Input type="email" label="Email" name="email" onChange={handleChange} value={values.email} />
            <Input type="password" label="Password" name="password" onChange={handleChange} value={values.password} />
            <div className="mt-6">
              <Button value="Sign in" isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
