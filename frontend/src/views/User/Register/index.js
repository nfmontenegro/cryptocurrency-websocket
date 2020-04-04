import React, {useState} from 'react'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'

import {registerUserAction} from '../../../redux/actions'
import {Button, Input, Notification} from '../../../components'
import {useEffect} from 'react'

const INITIAL_VALUES = {
  email: '',
  password: '',
  name: '',
  lastname: ''
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

const Signup = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const [notification, setNotification] = useState({show: false, message: null})
  const history = useHistory()
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SignupSchema,
    onSubmit: async values => await dispatch(registerUserAction(values))
  })

  const {handleSubmit, handleChange, values, isSubmitting, setSubmitting} = formik

  useEffect(() => {
    const {data, error} = userState
    if (error) {
      setNotification({show: true, message: userState.data})
      setTimeout(() => setNotification(false), 2500)
    }

    if (data && !error) {
      const {id, email} = data
      history.push(`/welcome?id=${id}&user=${email}`)
    }
  }, [userState, setSubmitting, history])

  return (
    <React.Fragment>
      {notification.show && <Notification message={notification.message} />}
      <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-1 text-center text-3xl leading-9 font-extrabold text-gray-900">Sign up into our APP</h2>
          </div>
          <form className=" max-w-sm mt-8" onSubmit={handleSubmit}>
            <Input type="email" label="Email" name="email" onChange={handleChange} value={values.email} />
            <Input type="password" label="Password" name="password" onChange={handleChange} value={values.password} />
            <Input type="text" label="Name" name="name" onChange={handleChange} value={values.name} />
            <Input type="text" label="Lastname" name="lastname" onChange={handleChange} value={values.lastname} />
            <Button value="Sign up" isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Signup
