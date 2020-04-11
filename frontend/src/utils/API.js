import axios from 'axios'
import {store} from '../redux/store'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  responseType: 'json'
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  response => response,
  error => {
    //move to constants
    const statusCodes = [401, 403]
    if (statusCodes.includes(error.response.status)) {
      store.dispatch({type: 'NOT_PERSIST'})
    }
    return error
  }
)

export default API
