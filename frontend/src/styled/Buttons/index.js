import styled from 'styled-components'

const Button = styled.button`
  background: ${props => (props.primary ? '#0069ff' : '#FFFFFF')};
  color: ${props => (props.primary ? '#FFFFFF' : '#0069ff')};
  font-size: 1em;
  height: 35px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #0069ff;
  border-radius: 3px;
`

export default Button
