import axios from 'axios'

const getTokenStorage = () => {
  const token = JSON.stringify(localStorage.getItem('token'))
  return token ? token : null
}

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  responseType: 'json',
  headers: {
    Authorization: getTokenStorage()
  }
})

export default API
