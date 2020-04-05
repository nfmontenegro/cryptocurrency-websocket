import axios from 'axios'
import store from '../redux/store'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  responseType: 'json',
})

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return token
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    store.dispatch({
      type: 'ERROR',
      payload: error,
    })
    return Promise.reject(error)
  }
)

export default API
