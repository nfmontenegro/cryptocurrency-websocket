import axios from 'axios'
import store from '../redux/store'

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

//Add expiration token
axios.interceptors.response.use(
  response => response,
  error => {
    console.log('interceptor error', error)
    store.dispatch({
      type: 'ERROR',
      payload: error
    })
    return Promise.reject(error)
  }
)

export default API
