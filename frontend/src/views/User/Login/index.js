import React, {useState} from 'react'
import {useFormik} from 'formik'

import {Button, Input} from '../../../components'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  const {handleSubmit, handleChange, values} = formik

  return (
    <div className="grid grid-cols-8">
      <div class="col-start-4 col-span-6">
        <form className=" max-w-sm" onSubmit={handleSubmit}>
          <Input type="text" label="Email" name="email" onChange={handleChange} value={values.email} />
          <Input type="password" label="Password" name="password" onChange={handleChange} value={values.password} />
          <Button value="Sign up" />
        </form>
      </div>
    </div>
  )
}

export default Login
