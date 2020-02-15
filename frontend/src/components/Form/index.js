import React from 'react'
import {Form, Input} from 'antd'

const CustomForm = Form.create({
  name: 'custom-form',
  onFieldsChange(props, changeFields) {
    props.onChange(changeFields)
  },
  mapPropsToFields(props) {
    for (let propValue in props) {
      return {
        [propValue]: Form.createFormField({
          ...props[propValue],
          value: props[propValue].value
        })
      }
    }
  },
  onValuesChange(_, values) {
    console.log('### Values', values)
  }
})(props => {
  console.log('### Props', props)
  const {getFieldDecorator} = props.form
  return (
    <Form layout="inline">
      <Form.Item label="Username">
        {getFieldDecorator('username', {
          rules: [{required: true, message: 'Username is required!'}]
        })(<Input />)}
      </Form.Item>
    </Form>
  )
})

export default CustomForm
