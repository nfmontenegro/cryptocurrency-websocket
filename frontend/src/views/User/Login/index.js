import React, {useState} from 'react'
import {Button} from 'antd'
import {CustomForm} from '../../../components'

const Login = props => {
  const [fields, setFields] = useState({username: ''})

  const handleChange = changeFields => {
    const {value, name} = changeFields
    return setFields({
      ...fields,
      [name]: value
    })
  }

  console.log('Fields!!', fields)
  return <CustomForm {...fields} onChange={handleChange} />
}

export default Login
